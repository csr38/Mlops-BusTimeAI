from django.urls import path, include
from rest_framework import routers
from core import views
from .api import EtapaTransporteViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'api/etapatransporte',EtapaTransporteViewSet, 'core')

urlpatterns = [
    path('', include(router.urls)),  # Incluye las URLs del router
    path('api/predict-from-flask/', views.predict_from_flask, name='predict_from_flask'),
]