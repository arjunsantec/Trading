from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend


from . import serializers
from . import models


class MaterialReceiptViewSet(viewsets.ModelViewSet):
    """ViewSet for the MaterialReceipt class"""

    queryset = models.MaterialReceipt.objects.all()
    serializer_class = serializers.MaterialReceiptSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class GRNDetailsViewSet(viewsets.ModelViewSet):
    """ViewSet for the GRNDetails class"""

    queryset = models.GRNDetails.objects.all()
    serializer_class = serializers.GRNDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'product_code']


class ProductTaggingViewSet(viewsets.ModelViewSet):
    """ViewSet for the ProductTagging class"""

    queryset = models.ProductTagging.objects.all()
    serializer_class = serializers.ProductTaggingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','product','shelf','zone','ware_house','batch_no','load_date','unload_date','project']


class GoodsAcceptanceViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.GoodsAcceptance.objects.all()
    serializer_class = serializers.GoodsAcceptanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class GoodsAcceptanceDetailsViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.GoodsAcceptanceDetails.objects.all()
    serializer_class = serializers.GoodsAcceptanceDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'product_code']