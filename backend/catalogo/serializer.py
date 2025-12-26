from rest_framework import serializers
from .models import Categoria, Producto, Lote


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = [
            "idCategoria",
            "nombre",
            "descripcion",
            "estado",
            "productos_disponibles",
        ]


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            "sku",
            "nombre",
            "descripcion",
            "idCategoria",
            "categoria_nombre",
            "precio_venta",
            "estado",
            "stock_actual",
            "lotes_disponibles",
        ]
    def get_categoria_nombre(self, obj):
        return obj.idCategoria.nombre

from rest_framework import serializers
from .models import Lote

class LoteSerializer(serializers.ModelSerializer):
    sku = serializers.CharField(source="producto.sku", read_only=True)
    categoria_id = serializers.IntegerField(source="producto.idCategoria_id", read_only=True)

    class Meta:
        model = Lote
        fields = [
            "idLote",
            "n_serie",
            "sku",              # SKU del Producto (FK)
            "categoria_id",     # para debug
            "precio_compra",
            "cantidad",
            "fechaEntrada",
            "fechaVencimiento",
            "disponible",
        ]
