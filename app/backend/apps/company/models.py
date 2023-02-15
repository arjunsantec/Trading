from contextlib import nullcontext
from email.policy import default
from unittest.util import _MAX_LENGTH
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.db import models

# Create your models here.
from django.urls import reverse

from apps.audit_fields.models import AuditUuidModelMixin


User = get_user_model()


class Company(AuditUuidModelMixin):
    company_name = models.CharField(max_length=255, null=False)
    city = models.CharField(max_length=100, null=True, blank=True)
    pin_code = models.CharField(max_length=10, null=True, blank=True)
    state_code = models.IntegerField(null=True, default=0, blank=True)
    country_code = models.CharField(max_length=50, null=True, default=0, blank=True)
    state_name = models.CharField(max_length=50, default="", blank=True)
    country_name = models.CharField(max_length=50, default="", blank=True)
    gst_no = models.CharField(max_length=50, null=False, blank=True)
    # pan_no = models.CharField(max_length=50, null=False, blank=False, default=None)
    cin_no = models.CharField(max_length=50, null=False, blank=True, default=None)
    email = models.CharField(max_length=50, null=False, blank=True, default=None)
    phone_no = models.CharField(max_length=50, null=False, blank=True, default=None)
    is_head_office = models.BooleanField(default=False)
    registered_address = models.CharField(max_length=500,default=None,null=True, blank=True)
    corporate_address = models.CharField(max_length=500,default=None,null=True)
    organization_type = models.CharField(max_length=500,default=None,null=True)
    business_category = models.CharField(max_length=500,default=None,null=True)
    description = models.TextField(default=None,null=True,blank=True)
    images = models.ImageField(upload_to="images", blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.company_name)



class CompanyUser(AuditUuidModelMixin):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company", default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Company_store", default="")

    class Meta:
        pass


class AppSettings(AuditUuidModelMixin):
    app_key = models.CharField(max_length=50, unique=True)
    app_value = models.CharField(max_length=1000)

    class Meta:
        pass

class CompanySettings(AuditUuidModelMixin):
    app_key = models.CharField(max_length=50)
    app_value = models.CharField(max_length=1000)

    class Meta:
        pass


class Department(AuditUuidModelMixin):
    department_name = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=100,default=None,null=True)
    phone_number = models.CharField(max_length=30,default=None,null=True)

    head_of_department = models.ForeignKey('security.user',on_delete=models.CASCADE,default=None,null=True)

