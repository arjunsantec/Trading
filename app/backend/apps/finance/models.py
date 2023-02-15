from contextlib import nullcontext
from email.policy import default
from enum import unique
from unicodedata import decimal
from django.db import models
from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel

# Create your models here.
from apps.sales.models import ProjectCreation


class PriceSetting(AuditUuidModelMixin,ApprovalModel):
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="project_id")
    Currency = models.CharField(max_length=50, default=None, null=True)
    shelfRate = models.CharField(max_length=250,default=None,null=True,blank=True)
    # shelfCurrency = models.CharField(max_length=50, default=None, null=True)
    palletRate = models.CharField(max_length=50,default=None,null=True)
    # palletCurrency = models.CharField(max_length=50,default=None)
    paddonsRate = models.CharField(max_length=100,default=None,null=True)
    fridgeRate = models.CharField(max_length=100, default=None, null=True)
    # paddonsCurrency = models.CharField(max_length=250,default=None,null=True, blank=True)
    boxRate = models.CharField(max_length=250,default=None,null=True)
    # boxCurrency = models.CharField(max_length=250, default=None, null=True)
    pricingDate = models.CharField(max_length=250, default=None, null=True)

    class Meta:
        pass
    







