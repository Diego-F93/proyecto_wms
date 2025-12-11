from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError

from loginApp.permissions import IsAdminGroup, IsSupervisorGroup, IsOperatorGroup


from .serializers import IngresoOperacionInventarioSerializer
from .serializersGet import OperacionInventario, OperacionInventarioListSerializer
from .services import registrar_ingreso_lotes

from django.utils.dateparse import parse_date
from django.db.models import Prefetch

from .models import Transaccion 

class OperacionInventarioViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar operaciones de inventario.
    En este caso implementamos sólo 'create' para registrar una operación de ENTRADA
    con uno o varios lotes.
    """
    # permission_classes = [permissions.IsAuthenticated,
    #                         IsAdminGroup | IsSupervisorGroup | IsOperatorGroup]

    def create(self, request):
        """
        POST /api/inventario/operaciones/

        JSON esperado:
        {
          "documento_referencia": "OC-1234",
          "motivo_general": "Recepción proveedor X",
          "lotes": [
            {
              "sku": "SKU-001",
              "n_serie": "SN-0001",      # opcional, si viene => cantidad debe ser 1
              "cantidad": 1,
              "precio_compra": "1200.50",
              "fechaVencimiento": "2026-01-31",
              "motivo": "Recepción parcial"
            },
            {
              "sku": "SKU-002",
              "n_serie": null,
              "cantidad": 10,
              "precio_compra": "900.00",
              "fechaVencimiento": null,
              "motivo": null
            }
          ]
        }
        """
        serializer = IngresoOperacionInventarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        try:
            operacion, lotes, transacciones = registrar_ingreso_lotes(
                serializer.validated_data,
                request.user
            )
        except ValidationError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Armar respuesta para el front
        return Response(
            {
                "operacion": {
                    "id": operacion.id,
                    "codigo": operacion.codigo,
                    "tipo": operacion.tipo,
                    "fecha": operacion.fecha,
                    "documento_referencia": operacion.documento_referencia,
                    "motivo_general": operacion.motivo_general,
                },
                "lotes": [
                    {
                        "idLote": lote.idLote,
                        "sku": lote.sku.sku,
                        "n_serie": lote.n_serie,
                        "cantidad": lote.cantidad,
                        "fechaEntrada": lote.fechaEntrada,
                        "fechaVencimiento": lote.fechaVencimiento,
                        "precio_compra": lote.precio_compra,
                        "disponible": lote.disponible,
                    }
                    for lote in lotes
                ],
                "transacciones": [
                    {
                        "id": tx.id,
                        "id_transaccion": tx.id_transaccion,
                        "lote": tx.lote.idLote,
                        "tipo": tx.tipo,
                        "tipo_display": tx.get_tipo_display(),
                        "cantidad": tx.cantidad,
                        "fecha_transaccion": tx.fecha_transaccion,
                        "motivo": tx.motivo,
                    }
                    for tx in transacciones
                ]
            },
            status=status.HTTP_201_CREATED
        )


class OperacionInventarioListaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/operaciones/
    GET /api/operaciones/{id}/

    Filtros:
    - ?tipo=ENTRADA|SALIDA|AJUSTE
    - ?fecha_desde=YYYY-MM-DD
    - ?fecha_hasta=YYYY-MM-DD
    - ?sku=COD-SKU
    - ?usuario_id=ID
    """
    queryset = OperacionInventario.objects.all().order_by('-fecha')
    serializer_class = OperacionInventarioListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        qs = qs.prefetch_related(
            Prefetch(
                'transacciones',
                queryset=Transaccion.objects.select_related('lote', 'lote__sku')
            ),
            'usuario'
        )

        tipo = self.request.query_params.get('tipo')
        fecha_desde = self.request.query_params.get('fecha_desde')
        fecha_hasta = self.request.query_params.get('fecha_hasta')
        sku = self.request.query_params.get('sku')
        usuario_id = self.request.query_params.get('usuario_id')

        if tipo:
            qs = qs.filter(tipo=tipo)

        if fecha_desde:
            d = parse_date(fecha_desde)
            if d:
                qs = qs.filter(fecha__date__gte=d)

        if fecha_hasta:
            d = parse_date(fecha_hasta)
            if d:
                qs = qs.filter(fecha__date__lte=d)

        if usuario_id:
            qs = qs.filter(usuario_id=usuario_id)

        if sku:
            qs = qs.filter(transacciones__lote__sku__sku=sku).distinct()

        return qs
