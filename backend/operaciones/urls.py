# Importaciones necesarias para las rutas
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Importacion de las vistas
from .views import TransaccionViewSet

routers = DefaultRouter()
routers.register(r'transaccion', TransaccionViewSet, basename='transaccion')
urlpatterns = [
     path('', include(routers.urls) ),
]