from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend

from . import serializers
from . import models


class InvoiceCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the InvoiceCreation class"""
    queryset = models.InvoiceCreation.objects.all()
    serializer_class = serializers.InvoiceCreationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']