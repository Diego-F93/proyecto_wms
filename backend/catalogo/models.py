from django.db import models
from django.db.models import Sum
from django.db.models.functions import Coalesce

# Modelo de datos Categoria
class Categoria(models.Model):
    idCategoria = models.AutoField(primary_key=True)    #ID de categoria 
    nombre = models.CharField(max_length=100, unique=True)  #Nombre de categoria
    descripcion = models.TextField(blank=True, null=True)   #Descripcion de categoria
    estado = models.BooleanField(default=False) #Estado de categoria (Activo o Inactivo)

    @property
    def productos_disponibles(self):
        return self.productos.filter(estado=True).count()

class Producto(models.Model):
    
    sku = models.CharField(max_length=50, primary_key=True) #SKU Inico por producto
    nombre = models.CharField(max_length=200, unique=True) #Nombre de producto
    descripcion = models.TextField(blank=True, null=True) #Descripcion de producto
    idCategoria = models.ForeignKey(
    Categoria,
    on_delete=models.PROTECT,
    related_name='productos'
) #Clave foranea de pertenencia a Categoria
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2) #Valor de venta producto
    estado = models.BooleanField(default=False) #Estado de producto (Activo o Inactivo)

    @property
    def stock_actual(self):
        agg = self.lotes.filter(disponible=True).aggregate(
            total=Coalesce(Sum('cantidad'), 0)
        )
        return agg["total"]

    @property
    def lotes_disponibles(self):
        return self.lotes.filter(disponible=True, cantidad__gt=0).count()

class Lote(models.Model):
    idLote = models.AutoField(primary_key=True)
    n_serie = models.CharField(max_length=50, unique=True, blank=True, null=True)
    sku = models.ForeignKey(
        Producto,
        on_delete=models.PROTECT,
        related_name='lotes'   # 
    )
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cantidad = models.IntegerField(default=1)
    fechaEntrada = models.DateField(auto_now_add=True)
    fechaVencimiento = models.DateField(blank=True, null=True)
    disponible = models.BooleanField(default=False)

    def __str__(self):
        return f"Lote {self.idLote} - {self.sku_id}"