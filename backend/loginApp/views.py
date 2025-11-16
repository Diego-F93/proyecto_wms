from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt import tokens as refreshtoken
from .serializer import CustomUserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView



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
    

