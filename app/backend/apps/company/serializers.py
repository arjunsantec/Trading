from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models
from .models import Company
from apps.security.serializer import UserSerializer

User = get_user_model()


class CompanySerializer(serializers.ModelSerializer):
    companyName = serializers.CharField(source='company_name')
    pinCode = serializers.CharField(source='pin_code')
    stateCode = serializers.IntegerField(source='state_code', required=False)
    countryCode = serializers.CharField(source='country_code', allow_blank=True)
    stateName = serializers.CharField(source='state_name', allow_blank=True)
    countryName = serializers.CharField(source='country_name', allow_blank=True)
    taxNo = serializers.CharField(source='gst_no', allow_blank=True)
    # panNo = serializers.CharField(source='pan_no', allow_blank=True)
    vatNo = serializers.CharField(source='cin_no', allow_blank=True)
    phoneNo = serializers.CharField(source='phone_no', allow_blank=True)
    isHeadOffice = serializers.BooleanField(source='is_head_office')
    registeredAddress = serializers.CharField(source='registered_address', allow_blank=True)
    corporateAddress = serializers.CharField(source='corporate_address', allow_blank=True)
    organizationType = serializers.CharField(source='organization_type', allow_blank=True)
    businessCategory = serializers.CharField(source='business_category', allow_blank=True)

    class Meta:
        model = models.Company
        fields = [
            "id",
            "companyName",
            "city",
            "pinCode",
            "stateCode",
            "stateName",
            "taxNo",
            # "panNo",
            "vatNo",
            "email",
            "phoneNo",
            "isHeadOffice",
            "registeredAddress",
            "corporateAddress",
            "organizationType",
            "businessCategory",
            "description",
            "images",
            "countryCode",
            "countryName",
            'created',
            'modified',
        ]


class CompanyUserSerializer(serializers.ModelSerializer):
    # company = CompanySerializer(many=False, read_only=True)

    class Meta:
        model = models.CompanyUser
        fields = [
            "id",
            "user",
            "company",
        ]

    def to_representation(self, instance):
        data = super(CompanyUserSerializer, self).to_representation(instance)
        # data1 = super(UserSerializer, self).to_representation(instance)
        company_list= models.CompanyUser.objects.filter(id=data['id']).all().values('company', 'user')[0]
        data['companyName'] = models.Company.objects.filter(id=company_list['company']).all().values('company_name')[0]['company_name']
        data['userName'] = models.User.objects.filter(id=company_list['user']).all().values('first_name')[0]['first_name']

        return data


class AppSettingsSerializer(serializers.ModelSerializer):
    appKey = serializers.CharField(source='app_key')
    appValue = serializers.CharField(source='app_value')

    class Meta:
        model = models.AppSettings
        fields = [
            'id',
            'appKey',
            'appValue',

        ]

    def validate(self, attrs):
        try:
            obj = models.AppSettings.objects.get(app_key=attrs['app_key'])
        except models.AppSettings.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['app_key'] + '  already exists')
        return attrs


class DepartmentSerializer(serializers.ModelSerializer):
    departmentName = serializers.CharField(source='department_name')
    contactEmail = serializers.CharField(source='email', allow_blank=True)
    phoneNumber = serializers.CharField(source='phone_number', allow_blank=True)
    headOfDepartment = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='head_of_department')

    class Meta:
        model = models.Department
        fields = [
            'id',
            'departmentName',
            'contactEmail',
            'phoneNumber',
            'headOfDepartment',
            'created',
            'modified',
        ]

    def validate(self, attrs):
        try:
            obj = models.Department.objects.get(department_name=attrs['department_name'])
        except models.Department.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['department_name'] + '  already exists')
        return attrs

    def to_representation(self, instance):
        res = super(DepartmentSerializer, self).to_representation(instance)
        # res['headOfDepartment'] = res
        # self.fields['headOfDepartment'] =  UserSerializer(instance,read_only=True,many=True)
        # res['first_name'] = UserSerializer(instance.head_of_department, read_only=True, many=False).data
        head_of_department_list= models.Department.objects.filter(id=res['id']).all().values('head_of_department')[0]
        res['headOfDepartment'] = models.User.objects.filter(id=head_of_department_list['head_of_department']).all().values('first_name')[0]['first_name']

        return res
