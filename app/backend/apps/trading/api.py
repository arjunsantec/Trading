from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models
from rest_framework import filters

class TradeViewSet(viewsets.ModelViewSet):
    """ViewSet for the TradingViewSet class"""
    queryset = models.Trade.objects.all()
    serializer_class = serializers.TradeSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, ]
    search_fields = ['company']


class TradeListViewSet(viewsets.ModelViewSet):  
    queryset = models.TradeData.objects.all()  
    serializer_class = serializers.TradeDataSerializer  
    permission_classes = [permissions.IsAuthenticated]    
