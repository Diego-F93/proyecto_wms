# Importaciones necesarias para las rutas
from django.urls import path
from rest_framework.routers import DefaultRouter

# Importacion de las vistas
from .views import CategoriaViewSet, ProductoViewSet, LoteViewSet

routers = DefaultRouter()
routers.register(r'categorias', CategoriaViewSet, basename='categoria')
routers.register(r'productos', ProductoViewSet, basename='producto')
routers.register(r'lotes', LoteViewSet, basename='lote')
urlpatterns = [
     path('categorias/', CategoriaViewSet.as_view({'get': 'list', 'post': 'create'}), name='categoria-list'),
     path('categorias/<int:pk>/', CategoriaViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='categoria-detail'),
     path('productos/', ProductoViewSet.as_view({'get': 'list', 'post': 'create'}), name='producto-list'),
     path('productos/<int:pk>/', ProductoViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='producto-detail'),
     path('lotes/', LoteViewSet.as_view({'get': 'list', 'post': 'create'}), name='lote-list'),
     path('lotes/<int:pk>/', LoteViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='lote-detail'),
]