from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend


from . import serializers
from . import models


class StudyMaterialReturnViewSet(viewsets.ModelViewSet):
    """ViewSet for the Study Material Return class"""

    queryset = models.StudyMaterialReturn.objects.all()
    serializer_class = serializers.StudyMaterialReturnSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class StudyMaterialDestructionViewSet(viewsets.ModelViewSet):
    """ViewSet for the Study Material Destruction class"""

    queryset = models.StudyMaterialDestruction.objects.all()
    serializer_class = serializers.StudyMaterialDestructionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class StudyMaterialDeliveryViewSet(viewsets.ModelViewSet):
    """ViewSet for the Study Material Delivery class"""

    queryset = models.StudyMaterialDelivery.objects.all()
    serializer_class = serializers.StudyMaterialDeliverySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class DeliverySitePatientViewSet(viewsets.ModelViewSet):
    """ViewSet for the Delivery From Site to Patient class"""

    queryset = models.DeliverySitePatient.objects.all()
    serializer_class = serializers.DeliverySitePatientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class NurseToPatientViewSet(viewsets.ModelViewSet):
    """ViewSet for the Nurse Transportation From Site to Patient class"""

    queryset = models.NurseToPatient.objects.all()
    serializer_class = serializers.NurseToPatientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class SiteToSiteViewSet(viewsets.ModelViewSet):
    """ViewSet for the Transfers From Site to Site class"""

    queryset = models.SiteToSite.objects.all()
    serializer_class = serializers.SiteToSiteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class StudyMaterialExportedViewSet(viewsets.ModelViewSet):
    """ViewSet for the Transfers From Site to Site class"""

    queryset = models.StudyMaterialExported.objects.all()
    serializer_class = serializers.StudyMaterialExportedSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']


class ExpireDateChangeViewSet(viewsets.ModelViewSet):
    """ViewSet for the Expire Date Change class"""

    queryset = models.ExpireDateChange.objects.all()
    serializer_class = serializers.ExpireDateChangeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
