from django.db import models
from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel

from apps.sales.models import ProjectCreation
from apps.masters.models import PartyMaster


class InvoiceCreation(AuditUuidModelMixin, ApprovalModel):
    # consignee = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_M_consignee",
    #                               null=True, blank=True)
    # importer_of_record = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_M_importer",
    #                                        null=True, blank=True)
    consignee = models.CharField(max_length=200, null=True, blank=True)
    importer_of_record = models.CharField(max_length=200, null=True, blank=True)
    customs_broker = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_M_customs_broker",
                                       null=True, blank=True)
    invoice = models.CharField(max_length=200, null=True, blank=True)
    invoice_date = models.CharField(max_length=100, null=True, blank=True)
    initial = models.CharField(max_length=100, null=True, blank=True)
    protocol = models.CharField(max_length=100, null=True, blank=True)
    incoterms = models.CharField(max_length=100, null=True, blank=True)
    shipments_contains = models.CharField(max_length=100, null=True, blank=True)
    total_quantity = models.CharField(max_length=100, null=True, blank=True)
    sub_total = models.CharField(max_length=100, null=True, blank=True)
    # country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    country_of_origin = models.TextField(default=None, null=True, blank=True)
    manufacturer = models.CharField(max_length=100, null=True, blank=True)
    carrier = models.CharField(max_length=100, null=True, blank=True)
    service = models.CharField(max_length=100, null=True, blank=True)
    hawb = models.CharField(max_length=100, null=True, blank=True)
    dispatch_date = models.CharField(max_length=100, null=True, blank=True)
    delivery_date = models.CharField(max_length=100, null=True, blank=True)
    consignment = models.CharField(max_length=100, null=True, blank=True)
    marks = models.CharField(max_length=100, null=True, blank=True)
    quantity = models.CharField(max_length=100, null=True, blank=True)
    net_weight = models.CharField(max_length=100, null=True, blank=True)
    gross_weight = models.CharField(max_length=100, null=True, blank=True)
    dimension = models.CharField(max_length=100, null=True, blank=True)
    note = models.TextField(default=None, null=True, blank=True)
    exporter = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        pass


class InvoiceCreationDetails(AuditUuidModelMixin, ApprovalModel):
    invoice_creation = models.ForeignKey(InvoiceCreation, default="", on_delete=models.CASCADE,
                                         related_name="invoice_creation_list", blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    expiry_date = models.CharField(max_length=100, null=True, blank=True)
    batch = models.CharField(max_length=100, null=True, blank=True)
    quantity = models.CharField(max_length=100, null=True, blank=True)
    country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    tariff_no = models.CharField(max_length=100, null=True, blank=True)
    value_per_unit = models.CharField(max_length=100, null=True, blank=True)
    sub_total = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        pass

