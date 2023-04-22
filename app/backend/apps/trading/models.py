from contextlib import nullcontext
from email.policy import default
from enum import unique

from django_audit_fields.models import AuditUuidModelMixin
from unicodedata import decimal
from django.db import models
# from django_audit_fields import *
from apps.company.models import Company
# from apps.audit_fields.models import AuditUuidModelMixin


class Trade(AuditUuidModelMixin):
    date = models.CharField(max_length=250, null=True, blank=True)
    company = models.CharField(max_length=250, null=True, blank=True)
    class Meta:
        pass


class TradeData(models.Model):

    date=models.CharField(max_length=50, null=False,blank=False)
    ticker=models.CharField(max_length=100, null=False,blank=False)
    time_interval = models.CharField(max_length=25,null=False,blank=True)
    class Meta:
        pass



