from rest_framework.routers import DefaultRouter
from .views import OperacionInventarioViewSet, OperacionInventarioViewSet

router = DefaultRouter()
router.register(r'ingreso', OperacionInventarioViewSet, basename='operaciones-inventario')
router.register(r'lista', OperacionInventarioViewSet, basename='operaciones-inventario-lista')

urlpatterns = router.urls