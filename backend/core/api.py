from .models import EtapaTransporte
from rest_framework import viewsets, permissions
from .serializers import EtapaTransporteSerializer

class EtapaTransporteViewSet(viewsets.ModelViewSet):
    queryset = EtapaTransporte.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class =EtapaTransporteSerializer