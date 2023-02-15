from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend

from . import serializers
from . import models


class CompanyViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['company_name','pin_code','phone_no']


class CompanyUserViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.CompanyUser.objects.all()
    serializer_class = serializers.CompanyUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']

    # def get_queryset(self):
    #     if 'query' in self.request.query_params['query'] and self.request.query_params['query'] == 'all':
    #         return models.CompanyUser.objects.all()
    #     else:
    #         return models.CompanyUser.objects.filter(user_id=self.request.user.id).all()


class AppSettingViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.AppSettings.objects.all()
    serializer_class = serializers.AppSettingsSerializer



class DepartmentViewSet(viewsets.ModelViewSet):
    """ViewSet for the Company class"""

    queryset = models.Department.objects.all()
    serializer_class = serializers.DepartmentSerializer