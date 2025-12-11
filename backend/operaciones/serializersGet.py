# inventario/api/serializers_operaciones.py
from rest_framework import serializers
from operaciones.models import OperacionInventario, Transaccion  # ajusta el import según tu app
from catalogo.models import Lote, Producto


class TransaccionListSerializer(serializers.ModelSerializer):
    # Datos enriquecidos para la UI
    lote_id = serializers.IntegerField(source='lote.idLote', read_only=True)
    sku = serializers.CharField(source='lote.sku.sku', read_only=True)
    nombre_producto = serializers.CharField(source='lote.sku.nombre', read_only=True)
    n_serie = serializers.CharField(source='lote.n_serie', read_only=True)

    class Meta:
        model = Transaccion
        fields = [
            'id',
            'id_transaccion',
            'fecha_transaccion',
            'tipo',
            'cantidad',
            'motivo',
            # enriquecidos:
            'lote_id',
            'sku',
            'nombre_producto',
            'n_serie',
        ]


class OperacionInventarioListSerializer(serializers.ModelSerializer):
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)
    usuario_nombre = serializers.CharField(
        source='usuario.get_full_name',
        read_only=True
    )
    transacciones = TransaccionListSerializer(many=True, read_only=True)

    total_unidades = serializers.SerializerMethodField()

    class Meta:
        model = OperacionInventario
        fields = [
            'id',
            'codigo',
            'tipo',
            'fecha',
            'usuario',
            'usuario_email',
            'usuario_nombre',
            'documento_referencia',
            'motivo_general',
            'total_unidades',
            'transacciones',
        ]

    def get_total_unidades(self, obj):
        return sum(t.cantidad for t in obj.transacciones.all())
