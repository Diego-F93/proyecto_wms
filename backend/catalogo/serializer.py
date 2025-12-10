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
    stock_actual = serializers.ReadOnlyField()

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
            "stock_actual"
        ]
    def get_categoria_nombre(self, obj):
        return obj.idCategoria.nombre

class LoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = [
            "idLote",
            "n_serie",
            "sku",
            "precio_compra",
            "cantidad",
            "fechaEntrada",
            "fechaVencimiento",
            "disponible"
        ]
