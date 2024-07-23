from rest_framework import serializers
from .models import EtapaTransporte

class EtapaTransporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EtapaTransporte
        fields = '__all__'