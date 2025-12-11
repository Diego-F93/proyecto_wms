from rest_framework.routers import DefaultRouter
from .views import OperacionInventarioViewSet, OperacionInventarioListaViewSet

router = DefaultRouter()
router.register(r'ingreso', OperacionInventarioViewSet, basename='operaciones-inventario')
router.register(r'lista', OperacionInventarioListaViewSet, basename='operaciones-inventario-lista')

urlpatterns = router.urls