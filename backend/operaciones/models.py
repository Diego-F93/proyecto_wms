from django.db import models, transaction as db_transaction
from django.conf import settings
from django.core.exceptions import ValidationError

from catalogo.models import Lote,Categoria

# Create your models here.

class Transaccion(models.Model):
    TIPO_ENTRADA = "ENTRADA"
    TIPO_SALIDA = "SALIDA"
    TIPO_AJUS_POS = "AJUSTE_POST"
    TIPO_AJUS_NEG = "AJUSTE_NEG"
    
    TIPO_CHOICES = (
        (TIPO_ENTRADA,"Entrada"),
        (TIPO_SALIDA,"Salida"),
        (TIPO_AJUS_POS,"Ajuste Positivo"),
        (TIPO_AJUS_NEG,"Ajuste Negativo")
    )

    id = models.AutoField(primary_key=True)
    lote = models.ForeignKey(Lote,
                            on_delete=models.PROTECT,
                            related_name='transacciones')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL,
                            on_delete=models.PROTECT,
                            related_name='transacciones')
    id_transaccion = models.CharField(
        max_length=30,
        unique=True
        )
    fecha_transaccion = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(
        max_length=15,
        choices=TIPO_CHOICES
    )
    cantidad = models.PositiveBigIntegerField(default=1)
    motivo = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    class Meta:
        ordering = ['-fecha_transaccion']

    def __str__(self):
        return f'{self.id_transaccion} - {self.TIPO_CHOICES} - Lote {self.lote_id}'
    
    def clean(self):
        
        if self.cantidad <=0:
            raise ValidationError("La cantidad debe ser mayor que 0")
        
        if self.pk is None:
            if self.tipo in [self.TIPO_AJUS_NEG, self.TIPO_SALIDA]:
                if self.lote.cantidad < self.cantidad:
                    raise ValidationError(
                        f"No hay stock suficiente en el lote"
                        f"(disponible {self.lote.cantiad}, solicitado {self.cantidad})."
                    )
    def save(self, *args, **kwards):

        is_new = self.pk is None

        self.full_clean()

        with db_transaction.atomic():
            super().save(*args, **kwards)

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
            
                lote.save()