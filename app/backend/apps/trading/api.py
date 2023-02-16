from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models
from rest_framework import filters

class MEDJobbingProformaViewSet(viewsets.ModelViewSet):
    """ViewSet for the JobbingProformaView class"""

    queryset = models.MEDJobbingProforma.objects.all()
    serializer_class = serializers.MEDJobbingProformaSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['jobNo']
