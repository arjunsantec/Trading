from contextlib import nullcontext
from email.policy import default
from enum import unique
from unicodedata import decimal
from django.db import models
from apps.company.models import Company
from apps.audit_fields.models import AuditUuidModelMixin

# create models here
class Trade(AuditUuidModelMixin):
    date = models.CharField(max_length=250, null=True, blank=True)
    company = models.CharField(max_length=250, null=True, blank=True)
    class Meta:
        pass
