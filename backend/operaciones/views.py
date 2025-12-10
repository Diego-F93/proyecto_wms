from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Modelos y Serializadores
from .models import Transaccion
from .serializer import TransaccionSerializer

# Validaciones de permisos por grupo 
from loginApp.permissions import IsAdminGroup, IsSupervisorGroup, IsOperatorGroup

# Create your views here.

class TransaccionViewSet(viewsets.ModelViewSet): # Vista para el modelo Transaccion
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

    # permission_classes = [permissions.IsAuthenticated,
    #                        IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]  