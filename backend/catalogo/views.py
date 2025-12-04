# importacions 
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import viewsets, permissions

# Modelos y Serializadores
from .models import Categoria, Producto, Lote
from .serializer import CategoriaSerializer, ProductoSerializer, LoteSerializer

# Validaciones de permisos por grupo 
from loginApp.permissions import IsAdminGroup, IsSupervisorGroup, IsOperatorGroup

# Create your views here.

class CategoriaViewSet(viewsets.ModelViewSet): # Vista para el modelo Categoria
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticated,
                           IsAdminGroup | IsSupervisorGroup]  # Permitir acceso sin autenticación
    

class ProductoViewSet(viewsets.ModelViewSet): # Vista para el modelo Producto
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated,
                           IsAdminGroup | IsSupervisorGroup]  # Permitir acceso sin autenticación


# method_decorator(login_required, name='dispatch')
# method_decorator(user_passes_test(
#     lambda u: u.is_staff
#     or u.groups.filter(name__in=['Administrador', 'Supervisor', 'Operador']).exists()
#     ), name='dispatch')
class LoteViewSet(viewsets.ModelViewSet): # Vista para el modelo Lote
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer
    permission_classes = [permissions.IsAuthenticated,
                           IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]  # Permitir acceso sin autenticación
