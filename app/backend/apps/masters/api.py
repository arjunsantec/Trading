from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models
from rest_framework import filters


class PartyMasterViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.PartyMaster.objects.all()
    serializer_class = serializers.PartyMasterSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tax_no', 'phone_number']
    search_fields = ['party_name', 'party_code']


class ProductCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for the ProductCategory class"""

    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.ProductCategorySerializer
    parser_classes = (FormParser, MultiPartParser)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category_name', 'category_code']


class ProductSubCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for the ProductSubCategory class"""

    queryset = models.ProductSubCategory.objects.all()
    serializer_class = serializers.ProductSubCategorySerializer
    parser_classes = (FormParser, MultiPartParser)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','category', 'subcat_name', 'subcat_code']


class UnitMasterViewSet(viewsets.ModelViewSet):
    """ViewSet for the UnitMaster class"""

    queryset = models.UnitMaster.objects.all()
    serializer_class = serializers.UnitMasterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['primary_unit', 'secondary_unit']


class ProductMasterViewSet(viewsets.ModelViewSet):
    """ViewSet for the ProductMaster class"""

    queryset = models.ProductMaster.objects.all()
    serializer_class = serializers.ProductMasterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product_name', 'product_code']


class ProductImageUploadViewSet(viewsets.ModelViewSet):
    """ViewSet for the Product Image Upload class"""

    queryset = models.ProductMasterImageUpload.objects.all()
    serializer_class = serializers.ProductMasterImageUploadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


