from django.db import models, transaction as db_transaction
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.crypto import get_random_string


from catalogo.models import Lote, Producto

class OperacionInventario(models.Model):
    TIPO_ENTRADA = "ENTRADA"
    TIPO_SALIDA = "SALIDA"
    TIPO_AJUSTE = "AJUSTE"

    TIPO_CHOICES = (
        (TIPO_ENTRADA, "Entrada"),
        (TIPO_SALIDA,  "Salida"),
        (TIPO_AJUSTE,  "Ajuste"),
    )

    id = models.AutoField(primary_key=True)

    codigo = models.CharField(
        max_length=40,
        unique=True,
        help_text="Código de la operación (ej: OP-20251210-0001)."
    )

    tipo = models.CharField(
        max_length=10,
        choices=TIPO_CHOICES
    )

    fecha = models.DateTimeField(auto_now_add=True)

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='operaciones_inventario'
    )

    documento_referencia = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="OC, guía de despacho, factura, etc."
    )

    motivo_general = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    class Meta:
        ordering = ['-fecha']

    def __str__(self):
        return f'{self.codigo} - {self.get_tipo_display()}'


class Transaccion(models.Model):
    # TIPOS DE TRANSACCIÓN (línea de detalle)
    TIPO_ENTRADA   = "ENTRADA"
    TIPO_SALIDA    = "SALIDA"
    TIPO_AJUS_POS  = "AJUSTE_POST"
    TIPO_AJUS_NEG  = "AJUSTE_NEG"

    TIPO_CHOICES = (
        (TIPO_ENTRADA,  "Entrada"),
        (TIPO_SALIDA,   "Salida"),
        (TIPO_AJUS_POS, "Ajuste Positivo"),
        (TIPO_AJUS_NEG, "Ajuste Negativo"),
    )

    id = models.AutoField(primary_key=True)

    # Cabecera (operación) -> mantiene 3FN
    operacion = models.ForeignKey(
        OperacionInventario,
        on_delete=models.PROTECT,
        related_name='transacciones'
    )

    lote = models.ForeignKey(
        Lote,
        on_delete=models.PROTECT,
        related_name='transacciones'
    )

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='transacciones'
    )

    id_transaccion = models.CharField(
        max_length=30,
        unique=True,
        editable=False
    )

    fecha_transaccion = models.DateTimeField(auto_now_add=True)

    tipo = models.CharField(
        max_length=15,
        choices=TIPO_CHOICES
    )

    cantidad = models.PositiveBigIntegerField(default=1)

    motivo = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    class Meta:
        ordering = ['-fecha_transaccion']

    def __str__(self):
        return f'{self.id_transaccion} - {self.get_tipo_display()} - Lote {self.lote_id}'

    # ---------- Helper para generar ID legible ----------

    def _generar_id_transaccion(self) -> str:
        prefijos = {
            self.TIPO_ENTRADA:  "ENT",
            self.TIPO_SALIDA:   "SAL",
            self.TIPO_AJUS_POS: "AJP",
            self.TIPO_AJUS_NEG: "AJN",
        }
        prefijo = prefijos.get(self.tipo, "TX")
        timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
        aleatorio = get_random_string(4).upper()
        return f'{prefijo}-{timestamp}-{aleatorio}'

    # ---------- Validaciones ----------

    def clean(self):
        super().clean()

        if self.cantidad <= 0:
            raise ValidationError("La cantidad debe ser mayor que 0")

        # Validación de stock sólo en nuevas transacciones de salida/ajuste negativo
        if self.pk is None and self.tipo in [self.TIPO_AJUS_NEG, self.TIPO_SALIDA]:
            stock_disponible = self.lote.cantidad
            if stock_disponible < self.cantidad:
                raise ValidationError(
                    f"No hay stock suficiente en el lote "
                    f"(disponible {stock_disponible}, solicitado {self.cantidad})."
                )

    # ---------- Guardado / impacto en Lote ----------

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        if not self.id_transaccion:
            self.id_transaccion = self._generar_id_transaccion()

        # Lanza clean() + validaciones de campo
        self.full_clean()

        with db_transaction.atomic():
            super().save(*args, **kwargs)

            if is_new:
                lote = self.lote

                if self.tipo in [self.TIPO_ENTRADA, self.TIPO_AJUS_POS]:
                    lote.cantidad += self.cantidad
                    lote.disponible = True

                elif self.tipo in [self.TIPO_SALIDA, self.TIPO_AJUS_NEG]:
                    lote.cantidad -= self.cantidad
                    if lote.cantidad <= 0:
                        lote.cantidad = 0
                        lote.disponible = False

                lote.save(update_fields=['cantidad', 'disponible'])
