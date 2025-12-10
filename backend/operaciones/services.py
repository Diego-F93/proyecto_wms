# inventario/services.py

import uuid
from django.db import transaction as db_transaction
from django.core.exceptions import ValidationError, ObjectDoesNotExist


from .models import (
    Producto,            # ajusta el import según tu estructura real
    Lote,
    Transaccion,
    OperacionInventario
)


def _generar_codigo_operacion(tipo: str) -> str:
    """
    Genera un código único y legible para la operación.
    Ejemplo: OP-ENT-550e8400-e29b-41d4-a716-446655440000
    """
    prefijo = "OP"
    return f"{prefijo}-{tipo[:3]}-{uuid.uuid4()}"


def registrar_ingreso_lotes(data: dict, usuario):
    """
    Registra una operación de INVENTARIO de tipo ENTRADA con uno o varios lotes.

    Estructura esperada en `data`:

    data = {
        "documento_referencia": "OC-1234",       # opcional
        "motivo_general": "Recepción proveedor", # opcional
        "lotes": [
            {
                "sku": "SKU-0001",
                "n_serie": "L2025-001",          # opcional
                "cantidad": 50,
                "precio_compra": "1200.50",      # opcional (Decimal o str)
                "fechaVencimiento": "2026-01-31",# opcional (date o str)
                "motivo": "Recepción parcial"    # opcional
            },
            {
                "sku": "SKU-0002",
                "n_serie": null,
                "cantidad": 30,
                "precio_compra": "800.00",
                "fechaVencimiento": null,
                "motivo": null
            }
        ]
    }

    Retorna: (operacion, lista_lotes, lista_transacciones)
    """

    lotes_data = data.get("lotes")
    if not isinstance(lotes_data, list) or len(lotes_data) == 0:
        raise ValidationError("Debe enviar al menos un lote en el campo 'lotes'.")

    documento_referencia = data.get("documento_referencia")
    motivo_general = data.get("motivo_general")

    # Creamos todo en una sola transacción de base de datos
    with db_transaction.atomic():
        # 1) Crear cabecera de operación (tipo ENTRADA)
        tipo_operacion = OperacionInventario.TIPO_ENTRADA

        operacion = OperacionInventario.objects.create(
            codigo=_generar_codigo_operacion(tipo_operacion),
            tipo=tipo_operacion,
            usuario=usuario,
            documento_referencia=documento_referencia,
            motivo_general=motivo_general,
        )

        lotes_creados = []
        transacciones_creadas = []

        # 2) Procesar cada lote del payload
        for item in lotes_data:
            sku_code = item.get("sku")
            if not sku_code:
                raise ValidationError("Cada lote debe incluir el campo 'sku'.")

            try:
                producto = Producto.objects.get(sku=sku_code)
            except ObjectDoesNotExist:
                raise ValidationError(f"No se encontró producto con SKU '{sku_code}'.")

            cantidad = item.get("cantidad")
            if not isinstance(cantidad, int) or cantidad <= 0:
                raise ValidationError(
                    f"La cantidad para el SKU '{sku_code}' debe ser un entero mayor que 0."
                )

            n_serie = item.get("n_serie")
            if n_serie:
                # Validación de unicidad para n_serie (ya tienes unique=True en el modelo,
                # esto sólo adelanta el error con un mensaje más claro)
                if Lote.objects.filter(n_serie=n_serie).exists():
                    raise ValidationError(
                        f"Ya existe un lote con número de serie '{n_serie}'."
                    )

            # 2.1) Crear Lote (stock inicial 0, se ajusta por Transaccion)
            lote = Lote.objects.create(
                sku=producto,
                n_serie=n_serie,
                precio_compra=item.get("precio_compra"),
                cantidad=0,  # La cantidad real se llevará por Transaccion
                fechaVencimiento=item.get("fechaVencimiento"),
                disponible=True,  # nuevo lote se considera disponible
                # fechaEntrada se setea sola por auto_now_add
            )
            lotes_creados.append(lote)

            # 2.2) Crear Transaccion de tipo ENTRADA para ese lote
            motivo_linea = item.get("motivo") or motivo_general or f"Ingreso lote {lote.idLote}"

            transaccion = Transaccion.objects.create(
                operacion=operacion,
                lote=lote,
                usuario=usuario,
                tipo=Transaccion.TIPO_ENTRADA,
                cantidad=cantidad,
                motivo=motivo_linea,
            )
            # El save() de Transaccion ya ajusta lote.cantidad y lote.disponible
            transacciones_creadas.append(transaccion)

        return operacion, lotes_creados, transacciones_creadas

def registrar_ingreso_lote_simple(lote_data: dict, usuario):
    """
    Versión simplificada para un solo lote.
    Internamente llama a registrar_ingreso_lotes.
    """
    data = {
        "documento_referencia": lote_data.get("documento_referencia"),
        "motivo_general": lote_data.get("motivo_general"),
        "lotes": [lote_data]
    }
    return registrar_ingreso_lotes(data, usuario)