from django.db import models

# Create your models here.

class Categoria(models.Model):
    idCategoria = models.AutoField(max_length=8, 
                                   primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    state = models.BooleanField(default=False)     

class Producto(models.Model):
    sku = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=200, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    idCategoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    state = models.BooleanField(default=False)

class Lote(models.Model):
    idLote = models.AutoField(primary_key=True)
    sku = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    fechaEntrada = models.DateField(auto_now_add=True)
    fechaVencimiento = models.DateField(blank=True, null=True)
    state = models.BooleanField(default=False)

