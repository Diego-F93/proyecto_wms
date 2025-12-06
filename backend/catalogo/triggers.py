# from django.db.models.signals import post_save, post_delete
# from django.dispatch import receiver
# from django.db.models import F

# from .models import Producto,Lote,Categoria
# from operaciones.models import Transaccion


# @receiver(post_save, sender=Transaccion)
# def actualizar_stock_on_create(sender, instance, created, **kwargs):
#     if not created:
#         # Para simplificar: asumimos que las transacciones no se editan
#         return

#     producto = instance.lote.producto

#     if instance.tipo == 'ENTRADA':
#         delta = instance.cantidad
#     else:  # SALIDA
#         delta = -instance.cantidad

#     Producto.objects.filter(pk=producto.pk).update(
#         stock_actual=F('stock_actual') + delta
#     )


# @receiver(post_delete, sender=Transaccion)
# def revertir_stock_on_delete(sender, instance, **kwargs):
#     """
#     Si borras una transacción, revertemos el efecto en el stock.
#     """
#     producto = instance.lote.producto

#     if instance.tipo == 'ENTRADA':
#         delta = -instance.cantidad
#     else:  # SALIDA
#         delta = instance.cantidad

#     Producto.objects.filter(pk=producto.pk).update(
#         stock_actual=F('stock_actual') + delta
#     )