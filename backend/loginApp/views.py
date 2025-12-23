from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt import tokens as refreshtoken
from .serializer import CustomUserSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import APIView


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

        # Si no es correcto devolvemos un error en la petición
        return Response(
            {'detail': 'Credenciales inválidas'},
            status=status.HTTP_404_NOT_FOUND)


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

        return Response(
            {"detail": f"Usuario {user.email} creado exitosamente."},
            status=status.HTTP_201_CREATED)



class Userlist(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUserSerializer.Meta.model.objects.all()

    # permission_classes = [IsAdminGroup]
    
    def get(self, request):
        try: 
            users = CustomUserSerializer(request.user)
        except Exception as e:
            return Response(
                {"detail": f"Error inesperado: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
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
        
        new_password = CustomUserSerializer.Meta.model.objects.make_random_password()
        user.set_password(new_password)
        user.save()

        return Response(
            {"new_password": new_password},
            status=status.HTTP_200_OK
        )