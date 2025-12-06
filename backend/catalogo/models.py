from django.db import models
from django.db.models import Sum
from django.db.models.functions import Coalesce

# Modelo de datos Categoria
class Categoria(models.Model):
    idCategoria = models.AutoField(primary_key=True)    #ID de categoria 
    nombre = models.CharField(max_length=100, unique=True)  #Nombre de categoria
    descripcion = models.TextField(blank=True, null=True)   #Descripcion de categoria
    estado = models.BooleanField(default=False) #Estado de categoria (Activo o Inactivo)
    productos_disponibles = models.PositiveIntegerField(default=0) #Cantidad de productos disponibles en la Categoria

class Producto(models.Model):
    sku = models.CharField(max_length=50, primary_key=True) #SKU Inico por producto
    nombre = models.CharField(max_length=200, unique=True) #Nombre de producto
    descripcion = models.TextField(blank=True, null=True) #Descripcion de producto
    idCategoria = models.ForeignKey(Categoria, on_delete=models.PROTECT) #Clave foranea de pertenencia a Categoria
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2) #Valor de venta producto
    estado = models.BooleanField(default=False) #Estado de producto (Activo o Inactivo)

    @property
    def stock_actual(self): #Funcion para obtener la cantidad total de productos por cada lote
        agg = self.Lote.filter(disponible = True).aggregate(
            total = Coalesce(Sum('cantidad', 0))
            )
        return agg['total']

class Lote(models.Model):
    idLote = models.AutoField(primary_key=True) #ID de lote
    n_serie = models.CharField(max_length=50, unique=True, blank=True, null=True) #Numero de serie de lote, opcional y unico, permite nulo
    sku = models.ForeignKey(Producto, on_delete=models.PROTECT) #Clave foreanea de Producto, evita eliminacion en cascada
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True) #Valor de compra SKU
    cantidad = models.IntegerField(default=1) #Cantiad de SKU, por defecto 1
    fechaEntrada = models.DateField(auto_now_add=True) #Fecha de ingreso de SKU, se crea de forma autonoma al ingresar crear la instancia
    fechaVencimiento = models.DateField(blank=True, null=True) #Fecha de pericidad, permite nulo
    disponible = models.BooleanField(default=False) #Disponibilidad del SKU (Disponible o No disponible)

