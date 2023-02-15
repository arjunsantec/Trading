from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models



class PriceSettingViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.PriceSetting.objects.all()
    serializer_class = serializers.PriceSettingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


