from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models


class WareHouseCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.WareHouseCreation.objects.all()
    serializer_class = serializers.WareHouseCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'warehouse_name']


class StorageZoneCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.StorageZoneCreation.objects.all()
    serializer_class = serializers.StorageZoneCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','zone_name', 'zone_code','warehouse']


class StorageTypeCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.StorageTypeCreation.objects.all()
    serializer_class = serializers.StorageTypeCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'storage_type']


class ZoneLevelCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ZoneLevelCreation.objects.all()
    serializer_class = serializers.ZoneLevelCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'storage_zone']


class ZoneLevelCreationDetailsViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ZoneLevelCreationDetails.objects.all()
    serializer_class = serializers.ZoneLevelCreationDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class ShelfCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ShelfCreation.objects.all()
    serializer_class = serializers.ShelfCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','zone_level','storage_zone','Rack']



# class GoodsAcceptanceViewSet(viewsets.ModelViewSet):
#     """ViewSet for the ContractReview class"""
#
#     queryset = models.GoodsAcceptance.objects.all()
#     serializer_class = serializers.GoodsAcceptanceSerializer

class RackToRackTransferViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.RackToRackTransfer.objects.all()
    serializer_class = serializers.RackToRackTransferSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class ZoneToZoneTransferViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ZoneToZoneTransfer.objects.all()
    serializer_class = serializers.ZoneToZoneTransferSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class PalletCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the Pallet Creation class"""

    queryset = models.PalletCreation.objects.all()
    serializer_class = serializers.PalletCreationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class RefrigerationViewSet(viewsets.ModelViewSet):
    """ViewSet for the Refrigeration class"""

    queryset = models.Refrigeration.objects.all()
    serializer_class = serializers.RefrigerationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']