# importacions 
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Sum, Q
from django.db.models.functions import Coalesce

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

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Supervisor").exists():
             return Categoria.objects.filter(estado=True)
        return Categoria.objects.all()
    

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Categoria.DoesNotExist:
            return Response(
                {"detail": "Categoria no encontrada."},
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
    
    

class ProductoViewSet(viewsets.ModelViewSet): # Vista para el modelo Producto
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = "sku"
    lookup_value_regex = "[^/]+"

    def get_queryset(self):
        user = self.request.user
        stockdisponible = self.request.query_params.get("stock_actual")

        # Base queryset
        qs = Producto.objects.all()

        # Restricción por rol
        if user.groups.filter(name__in=["Supervisor", "Operador"]).exists():
            qs = qs.filter(estado=True)

        # Filtro por stock
        if stockdisponible == "gt:0":
            qs = qs.annotate(
            stock_actual_db=Coalesce(
                Sum("lotes__cantidad", filter=Q(lotes__disponible=True)),
                0
            )
        )

        return qs

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


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer
    permission_classes = [
        IsAuthenticated & (IsAdminGroup | IsSupervisorGroup | IsOperatorGroup)
    ]

    def get_queryset(self):
        qs = Lote.objects.all()
        producto = self.request.query_params.get("producto")

        Lote.objects.filter(sku_id=producto, disponible=True, cantidad__gt=0)

        if producto:
            qs = qs.filter(
                sku=producto
            ).order_by("fechaVencimiento", "precio_compra")

        return qs

    # def get_permissions(self):


    #     if self.action in ['list', 'retrieve']:
    #         permission_classes = [permissions.IsAuthenticated,
    #                             IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]
    