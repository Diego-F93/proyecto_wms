from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    OperacionInventarioViewSet,
    OperacionInventarioListaViewSet,
    OperacionPorLoteCreateAPIView,
)

router = DefaultRouter()
router.register(r"ingreso", OperacionInventarioViewSet, basename="operaciones-inventario")
router.register(r"lista", OperacionInventarioListaViewSet, basename="operaciones-inventario-lista")

urlpatterns = [
    path("", include(router.urls)),
    path("por-lote/", OperacionPorLoteCreateAPIView.as_view(), name="operacion-por-lote-create"),
]
