from django.contrib import admin
from .models import OperacionInventario, Transaccion
# Register your models here.

admin.site.register(OperacionInventario)
admin.site.register(Transaccion)