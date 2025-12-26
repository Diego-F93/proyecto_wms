# operaciones/serializersMov.py
from rest_framework import serializers
from django.db import transaction
from django.utils import timezone

from .models import OperacionInventario, Transaccion
from catalogo.models import Lote

class OperacionPorLoteSerializer(serializers.Serializer):
    tipo_operacion = serializers.ChoiceField(
        choices=[OperacionInventario.TIPO_ENTRADA, OperacionInventario.TIPO_SALIDA, OperacionInventario.TIPO_AJUSTE]
    )
    tipo_movimiento = serializers.ChoiceField(choices=[c[0] for c in Transaccion.TIPO_CHOICES])

    documento_referencia = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    motivo_general = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    lotes = serializers.ListField(child=serializers.DictField(), allow_empty=False)

    def validate_lotes(self, value):
        # Validación básica de estructura
        for i, item in enumerate(value):
            if "lote_id" not in item:
                raise serializers.ValidationError(f"Fila {i+1}: falta lote_id")
            if "cantidad" not in item:
                raise serializers.ValidationError(f"Fila {i+1}: falta cantidad")
            if int(item["cantidad"]) <= 0:
                raise serializers.ValidationError(f"Fila {i+1}: cantidad debe ser > 0")
        return value

    @transaction.atomic
    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        tipo_operacion = validated_data["tipo_operacion"]     # ENTRADA / SALIDA / AJUSTE
        tipo_movimiento = validated_data["tipo_movimiento"]   # ENTRADA / SALIDA / AJUSTE_POST / AJUSTE_NEG

        # ✅ Coherencia: si movimiento es ajuste_* entonces operación debe ser AJUSTE
        if tipo_movimiento in [Transaccion.TIPO_AJUS_POS, Transaccion.TIPO_AJUS_NEG] and tipo_operacion != OperacionInventario.TIPO_AJUSTE:
            raise serializers.ValidationError({"tipo_operacion": "Si el movimiento es AJUSTE_POST/AJUSTE_NEG, tipo_operacion debe ser AJUSTE."})

        if tipo_movimiento in [Transaccion.TIPO_ENTRADA] and tipo_operacion != OperacionInventario.TIPO_ENTRADA:
            raise serializers.ValidationError({"tipo_operacion": "Si el movimiento es ENTRADA, tipo_operacion debe ser ENTRADA."})

        if tipo_movimiento in [Transaccion.TIPO_SALIDA] and tipo_operacion != OperacionInventario.TIPO_SALIDA:
            raise serializers.ValidationError({"tipo_operacion": "Si el movimiento es SALIDA, tipo_operacion debe ser SALIDA."})

        documento_referencia = validated_data.get("documento_referencia") or None
        motivo_general = validated_data.get("motivo_general") or None

        # ✅ Crear operación (cabecera). OJO: el campo se llama "tipo", no "tipo_operacion"
        operacion = OperacionInventario.objects.create(
            codigo=self._generar_codigo_operacion(),
            tipo=tipo_operacion,
            usuario=user,
            documento_referencia=documento_referencia,
            motivo_general=motivo_general,
            # fecha es auto_now_add, no necesitas setearla
        )

        lotes_items = validated_data["lotes"]

        # Crea transacciones (detalle)
        for item in lotes_items:
            lote_id = item["lote_id"]
            cantidad = int(item["cantidad"])
            motivo = item.get("motivo") or None

            # Tu pk real en Lote es idLote (según serializer)
            lote = Lote.objects.select_for_update().get(idLote=lote_id)

            # Si el lote no está disponible y es salida/ajuste_neg -> error
            if tipo_movimiento in [Transaccion.TIPO_SALIDA, Transaccion.TIPO_AJUS_NEG]:
                if not lote.disponible or lote.cantidad <= 0:
                    raise serializers.ValidationError({"lotes": [f"Lote {lote_id}: sin stock disponible."]})

            # ✅ Crear transacción (campo se llama "tipo")
            # El save() de Transaccion hace full_clean() + descuenta/ajusta stock
            Transaccion.objects.create(
                operacion=operacion,
                lote=lote,
                usuario=user,
                tipo=tipo_movimiento,
                cantidad=cantidad,
                motivo=motivo,
            )

        return operacion

    def _generar_codigo_operacion(self) -> str:
        # Ej: OP-20251225-123045 (puedes cambiar a tu formato OP-YYYYMMDD-0001 si quieres)
        ts = timezone.now().strftime("%Y%m%d-%H%M%S")
        return f"OP-{ts}"
