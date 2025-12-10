from rest_framework.routers import DefaultRouter
from .views import OperacionInventarioViewSet

router = DefaultRouter()
router.register(r'inventario/operaciones', OperacionInventarioViewSet, basename='operaciones-inventario')

urlpatterns = router.urls