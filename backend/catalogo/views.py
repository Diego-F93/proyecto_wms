# importacions 
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Modelos y Serializadores
from .models import Categoria, Producto, Lote
from .serializer import CategoriaSerializer, ProductoSerializer, LoteSerializer

# Validaciones de permisos por grupo 
from loginApp.permissions import IsAdminGroup, IsSupervisorGroup, IsOperatorGroup

# Create your views here.

class CategoriaViewSet(viewsets.ModelViewSet): # Vista para el modelo Categoria
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated  & (IsAdminGroup | IsSupervisorGroup)] 
    

class ProductoViewSet(viewsets.ModelViewSet): # Vista para el modelo Producto
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = "sku"
    lookup_value_regex = "[^/]+"

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Producto.DoesNotExist:
            return Response(
                {"detail": "Producto no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": f"Error inesperado: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Alternar estado
        instance.estado = not instance.estado
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create']:
             permission_classes = [permissions.IsAuthenticated,
                            IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]                       
    
        elif self.action in ['update','partial_update']:
                         permission_classes = [permissions.IsAuthenticated,
                            IsAdminGroup | IsSupervisorGroup]
        elif self.action in ['destroy']:
                         permission_classes = [permissions.IsAuthenticated, IsAdminGroup
                            ]
        else:
             permission_classes = [IsAuthenticated]
    
        return [perm() for perm in permission_classes]


class LoteViewSet(viewsets.ModelViewSet): # Vista para el modelo Lote
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer
    permission_classes = [permissions.IsAuthenticated,
                           IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]  