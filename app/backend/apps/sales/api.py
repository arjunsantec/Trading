from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import FormParser, MultiPartParser

from . import serializers
from . import models


class ContractReviewViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ContractReview.objects.all()
    serializer_class = serializers.ContractReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['contract_review_no','date','cr_type','review_status']


class OrderAcceptanceViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.OrderAcceptance.objects.all()
    serializer_class = serializers.OrderAcceptanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','oa_number','oa_date']

class OrderAcceptanceDetailsViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.OrderAcceptanceDetails.objects.all()
    serializer_class = serializers.OrderAcceptanceDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['oa_id']


class ProjectCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the Project Creation class"""

    queryset = models.ProjectCreation.objects.all()
    serializer_class = serializers.ProjectCreationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class ProformaKitCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the ContractReview class"""

    queryset = models.ProformaKitCreation.objects.all()
    serializer_class = serializers.ProformaKitCreationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'kit_name']


class CMTRFCreationViewSet(viewsets.ModelViewSet):
    """ViewSet for the CMTRF Creation class"""

    queryset = models.CMTRFCreation.objects.all()
    serializer_class = serializers.CMTRFCreationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class ProjectCreationFileUploadViewSet(viewsets.ModelViewSet):
    """ViewSet for the Project Creation FileUpload class"""

    queryset = models.ProjectCreationFileUpload.objects.all()
    serializer_class = serializers.ProjectCreationFileUploadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

