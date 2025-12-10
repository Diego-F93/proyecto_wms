# inventario/api/serializers.py
from rest_framework import serializers


class LoteIngresoSerializer(serializers.Serializer):
    """
    Lote afectado en la operación de inventario.
    """
    sku = serializers.CharField(max_length=50)

    n_serie = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True,
        help_text="Número de serie del lote (opcional, único si se usa)."
    )

    cantidad = serializers.IntegerField(
        min_value=1,
        help_text="Cantidad de unidades para este lote (debe ser > 0)."
    )

    precio_compra = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False,
        allow_null=True
    )

    fechaVencimiento = serializers.DateField(
        required=False,
        allow_null=True
    )

    motivo = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True,
        help_text="Motivo específico para este lote (opcional)."
    )

    def validate(self, attrs):
        """
        Regla de negocio:
        - Si viene n_serie, la cantidad NO puede ser mayor a 1.
        (en realidad, lo más coherente es exigir que sea exactamente 1)
        """
        n_serie = attrs.get("n_serie")
        cantidad = attrs.get("cantidad")

        if n_serie and cantidad is not None and cantidad != 1:
            raise serializers.ValidationError(
                "Para lotes con número de serie, la cantidad debe ser exactamente 1."
            )

        return attrs


class IngresoOperacionInventarioSerializer(serializers.Serializer):
    """
    Payload completo de la operación de inventario (cabecera + lotes).
    """
    documento_referencia = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        allow_null=True
    )

    motivo_general = serializers.CharField(
        max_length=100,
        required=False,
        allow_blank=True,
        allow_null=True
    )

    lotes = LoteIngresoSerializer(
        many=True,
        help_text="Lista de lotes afectados en esta operación."
    )

    def validate_lotes(self, value):
        if not value:
            raise serializers.ValidationError("Debe enviar al menos un lote en 'lotes'.")
        return value
