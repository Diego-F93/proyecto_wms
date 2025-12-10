# Importaciones necesarias para las rutas
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Importacion de las vistas
from .views import CategoriaViewSet, ProductoViewSet, LoteViewSet

routers = DefaultRouter()
routers.register(r'categorias', CategoriaViewSet, basename='categoria')
routers.register(r'productos', ProductoViewSet, basename='producto')
routers.register(r'lotes', LoteViewSet, basename='lote')
urlpatterns = [
     path('', include(routers.urls) ),
]