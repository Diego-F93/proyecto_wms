from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView, LogoutView, Userlist, SignupView
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register(r'userlist', Userlist, basename= 'userlist')


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#Ruta para obtener el token de acceso
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #Ruta para refrescar el token de acceso
    path('api/login/', LoginView.as_view(), name='login'), #Ruta para login
    path('api/logout/', LogoutView.as_view(), name='logout'), #Ruta para logout
    path('api/signup/', SignupView.as_view(), name= 'signup'), #Ruta para registro de usuarios
    path('api/', include(routers.urls)),
]