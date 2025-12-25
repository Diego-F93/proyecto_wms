from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework_simplejwt import tokens as refreshtoken
from .serializer import CustomUserSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import APIView

from django.utils.crypto import get_random_string

from notificaciones.views import send_custom_email


from .permissions import IsAdminGroup


class LoginView(APIView):
    def post(self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)

        # Si es correcto añadimos a la request la información de sesión
        if user:
            login(request, user)
            return Response(
                { 
                    'refresh': str(refreshtoken.RefreshToken.for_user(user)),
                    'access': str(refreshtoken.RefreshToken.for_user(user).access_token),
                    'user': CustomUserSerializer(user).data
                },
                status=status.HTTP_200_OK)
        elif User.objects.filter(is_active=False, email=email).exists():
            return Response(
                {"detail":"El usuario no esta activado. Por favor, contacte al administrador."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Si no es correcto devolvemos un error en la petición
        return Response(
            {'detail': 'Credenciales inválidas'},
            status=status.HTTP_404_NOT_FOUND)

class UserPasswordResetView(APIView):
    """
    POST /api/password-reset/
    Body: { "email": "...", "rut": "..."}
    Respuesta: new_password o mensaje de error 
    """  
    def post(self, request):
        
        success = False
        if not request.data.get("email"):
            raise ValidationError({"detail": "El campo email es obligatorio."})
        email = request.data.get("email")
        if not request.data.get("rut"):
            raise ValidationError({"detail": "El campo RUT es obligatorio."})    
        rut = request.data.get("rut")
        try:
            user = User.objects.filter(email=email, rut=rut).first()
        except User.DoesNotExist:
            return Response(
                {"detail": "Usuario no encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        except Exception as e:
            return Response(
                {"detail": f"Error inesperado: {str(e)}" },
                status=status.HTTP_400_BAD_REQUEST
            )
            
        new_password = get_random_string(length=12)
        user.set_password(new_password)
        user.save()
        success = True

        send_custom_email(
            subject= "Restablecimiento de contraseña",
            recipient_list= [user.email],
            template_name= "Password_reset.html",
            context= {"user" : user, "new_password" : new_password, "success": success}
        )

        return Response(
            {"detail": f"Contraseña restablecida correctamente. { new_password}"},
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        # Devolvemos la respuesta al cliente
        return Response(status=status.HTTP_200_OK)
    

class SignupView(APIView):
    serializer_class = CustomUserSerializer
    def post(self, request):
        if request.data.get("password") != request.data.get("password2"):
            return Response(
                {"detail": "Las contraseñas no coinciden."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Enviar correo de bienvenida
        send_custom_email(
            subject= "Bienvenido a WMS Ticashop",
            recipient_list= [user.email],
            template_name= "welcome.html",
            context= {"user" : user}
        )

        return Response(
            {"detail": f"Usuario {user.email} creado exitosamente."},
            status=status.HTTP_201_CREATED)



User = get_user_model()

class Userlist(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminGroup]

    # Opcional: ordenar
    def get_queryset(self):
        return User.objects.all().order_by("id")
    def destroy(self, request, pk=None):
        user = self.get_object()
        if user.id == request.user.id:
            return Response(
                {"detail": "No se puede desactivar al usuario actual."},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:       
            user.is_active = not user.is_active
            user.save(update_fields= ["is_active"])

            send_custom_email(
                subject= "Cambio en el estado de su cuenta",
                recipient_list= [user.email],
                template_name= "Account_status_changes.html",
                context= {"user" : user}
            )


            return Response({"detail": f"Usuario : {user.email} ha sido {"desactivado" if not user.is_active else "activado"}"},
                status=status.HTTP_204_NO_CONTENT)
        
    def password_reset(self, request, pk=None):
        
        try:
            user = self.get_object()
        except CustomUserSerializer.Meta.model.DoesNotExist:
            return Response(
                {"detail": "Usuario no encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        except Exception as e:
            return Response(
                {"detail": f"Error inesperado: {str(e)}" },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        new_password = get_random_string(length=12)
        user.set_password(new_password)
        user.save()

        send_custom_email(
            subject= "Restablecimiento de contraseña",
            recipient_list= [user.email],
            template_name= "Password_reset.html",
            context= {"user" : user, "new_password" : new_password, "success": True}
        )

        return Response(
            {"detail": f"Contraseña restablecida correctamente. { new_password}"},
            status=status.HTTP_200_OK
        )