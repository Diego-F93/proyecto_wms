from rest_framework import serializers
from .models import Categoria, Producto, Lote


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "sku",
            "nombre",
            "descripcion",
            "idCategoria",
            "precio_venta",
            "estado",
            "stock_actual"
        ]

class LoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = '__all__'
