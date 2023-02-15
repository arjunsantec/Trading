from django.db import models
from contextlib import nullcontext
from email.policy import default
from enum import unique
from unicodedata import decimal
from apps.company.models import Company
from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel
from apps.sales.models import ProjectCreation
from apps.wareshouse.models import WareHouseCreation
# Create your models here.
from apps.masters.models import ProductMaster, PartyMaster


class StudyMaterialReturn(AuditUuidModelMixin, ApprovalModel):
    supplier_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master_supplier", null=True, blank=True)
    supplier_address = models.TextField(max_length=2000, default=None, null=True)
    supplier_phone = models.CharField(max_length=200, null=True, blank=True)

    recipient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master_recipient_name", null=True, blank=True)
    recipient_address = models.TextField(max_length=2000, default=None, null=True)
    recipient_phone = models.CharField(max_length=200, null=True, blank=True)

    invoice = models.CharField(max_length=200, null=True, blank=True)
    number_of_place = models.CharField(max_length=200, null=True, blank=True)
    # sponser = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Return_Sponsor",
                                null=True, blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Return", null=True,
                                blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    courier = models.CharField(max_length=200, null=True, blank=True)
    # recipient = models.CharField(max_length=200, null=True, blank=True)
    pickup_date = models.DateTimeField(null=True, blank=True)
    income_date = models.DateTimeField(null=True, blank=True)
    # pickup_time = models.CharField(max_length=200, null=True, blank=True)
    # income_time = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialReturnDetails(AuditUuidModelMixin, ApprovalModel):
    study_material_return = models.ForeignKey(StudyMaterialReturn, default="", on_delete=models.CASCADE,
                                              related_name="study_material_return_list")
    study_product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, related_name="study_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    date = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialDestruction(AuditUuidModelMixin, ApprovalModel):
    client_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="client_name", null=True, blank=True)
    client_address = models.TextField(max_length=2000, default=None, null=True)
    client_phone = models.CharField(max_length=200, null=True, blank=True)

    service_provider_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="provider_name", null=True, blank=True)
    service_provider_address = models.TextField(max_length=2000, default=None, null=True)
    service_provider_phone = models.CharField(max_length=200, null=True, blank=True)

    document = models.CharField(max_length=200, null=True, blank=True)
    site = models.CharField(max_length=200, null=True, blank=True)
    number_of_place = models.CharField(max_length=200, null=True, blank=True)
    # sponser = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Destruct_Sponsor",
                                null=True, blank=True)
    full_weight = models.CharField(max_length=200, null=True, blank=True)
    full_size = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Destruct", null=True,
                                blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    test_note = models.TextField(max_length=3000, default=None, null=True)
    storage_logistic_manager = models.CharField(max_length=200, null=True, blank=True)
    destruction_provider = models.CharField(max_length=200, null=True, blank=True)
    destruction_date = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialDestructionDetails(AuditUuidModelMixin, ApprovalModel):
    study_material_destruction = models.ForeignKey(StudyMaterialDestruction, default="", on_delete=models.CASCADE,
                                                   related_name="study_material_destruction_list")
    destruction_product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, related_name="destruction_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    temp = models.CharField(max_length=200, null=True, blank=True)
    expiry_date = models.TextField(max_length=1000, null=True, blank=True)
    note = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialDelivery(AuditUuidModelMixin, ApprovalModel):
    supplier_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Supplier_name", null=True, blank=True)
    supplier_address = models.TextField(max_length=2000, default=None, null=True)
    supplier_phone = models.CharField(max_length=200, null=True, blank=True)

    recipient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Recipient_name", null=True, blank=True)
    recipient_address = models.TextField(max_length=2000, default=None, null=True)
    recipient_phone = models.CharField(max_length=200, null=True, blank=True)

    invoice = models.CharField(max_length=200, null=True, blank=True)
    local_invoice = models.CharField(max_length=200, null=True, blank=True)
    order_number = models.CharField(max_length=200, null=True, blank=True)
    awb = models.CharField(max_length=200, null=True, blank=True)
    # sponsor = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Delivery_Sponsor",
                                null=True, blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Delivery", null=True,
                                blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    box_quantity = models.CharField(max_length=200, null=True, blank=True)
    supplier_courier = models.CharField(max_length=200, null=True, blank=True)
    recipient_courier = models.CharField(max_length=200, null=True, blank=True)
    # warehouse = models.CharField(max_length=200, null=True, blank=True)
    warehouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="Warehouse_Delivery",
                                  null=True, blank=True)
    withdrawal_date = models.CharField(max_length=200, null=True, blank=True)
    verification = models.CharField(max_length=200, null=True, blank=True)
    delivery_date = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialDeliveryDetails(AuditUuidModelMixin, ApprovalModel):
    study_material_delivery = models.ForeignKey(StudyMaterialDelivery, default="", on_delete=models.CASCADE,
                                                related_name="study_material_delivery_list")
    study_product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                      related_name="details_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    validity = models.CharField(max_length=200, null=True, blank=True)
    temp = models.CharField(max_length=200, null=True, blank=True)
    receive_date = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class DeliverySitePatient(AuditUuidModelMixin, ApprovalModel):
    # site_name = models.CharField(max_length=200, null=True, blank=True)
    site_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="site_name", null=True, blank=True)
    site_address = models.TextField(max_length=2000, default=None, null=True)
    site_phone = models.CharField(max_length=200, null=True, blank=True)

    # patient_name = models.CharField(max_length=200, null=True, blank=True)
    patient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="patient_name", null=True,
                                     blank=True)
    patient_address = models.TextField(max_length=2000, default=None, null=True)
    patient_phone = models.CharField(max_length=200, null=True, blank=True)

    document = models.CharField(max_length=200, null=True, blank=True)
    # sponsor = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Patient_Sponsor",
                                null=True, blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_STP", null=True,
                                blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    box_quantity = models.CharField(max_length=200, null=True, blank=True)
    site_courier = models.CharField(max_length=200, null=True, blank=True)
    patient_courier = models.CharField(max_length=200, null=True, blank=True)
    transfer_date = models.CharField(max_length=200, null=True, blank=True)
    delivery_date = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class DeliverySitePatientDetails(AuditUuidModelMixin, ApprovalModel):
    delivery_site_patient = models.ForeignKey(DeliverySitePatient, default="", on_delete=models.CASCADE,
                                              related_name="delivery_site_patient_list")
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                related_name="site_patient_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    temp = models.CharField(max_length=200, null=True, blank=True)
    note = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class NurseToPatient(AuditUuidModelMixin, ApprovalModel):
    # site_name = models.CharField(max_length=200, null=True, blank=True)
    site_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="nurse_site_name", null=True,
                                  blank=True)
    site_address = models.TextField(max_length=2000, default=None, null=True)
    site_phone = models.CharField(max_length=200, null=True, blank=True)

    # patient_name = models.CharField(max_length=200, null=True, blank=True)
    patient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="nurse_patient_name", null=True,
                                     blank=True)
    patient_address = models.TextField(max_length=2000, default=None, null=True)
    patient_phone = models.CharField(max_length=200, null=True, blank=True)

    document = models.CharField(max_length=200, null=True, blank=True)
    # sponsor = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Nurse_Sponsor", null=True,
                                blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_NTP", null=True,
                                blank=True)
    invoice = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class SiteToSite(AuditUuidModelMixin, ApprovalModel):
    # from_name = models.CharField(max_length=200, null=True, blank=True)
    from_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="from_name", null=True,
                                  blank=True)
    from_address = models.TextField(max_length=2000, default=None, null=True)
    from_phone = models.CharField(max_length=200, null=True, blank=True)

    # to_name = models.CharField(max_length=200, null=True, blank=True)
    to_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="to_name", null=True,
                                blank=True)
    to_address = models.TextField(max_length=2000, default=None, null=True)
    to_phone = models.CharField(max_length=200, null=True, blank=True)

    document = models.CharField(max_length=200, null=True, blank=True)
    # sponsor = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Site_Sponsor", null=True,
                                blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_STS", null=True,
                                blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    box_quantity = models.CharField(max_length=200, null=True, blank=True)
    from_courier = models.CharField(max_length=200, null=True, blank=True)
    to_courier = models.CharField(max_length=200, null=True, blank=True)
    transfer_date = models.CharField(max_length=200, null=True, blank=True)
    delivery_date = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class SiteToSiteDetails(AuditUuidModelMixin, ApprovalModel):
    site_to_site = models.ForeignKey(SiteToSite, default="", on_delete=models.CASCADE,
                                     related_name="site_to_site_list")
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                related_name="site_to_site_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    temp = models.CharField(max_length=200, null=True, blank=True)
    note = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialExported(AuditUuidModelMixin, ApprovalModel):
    # sender_name = models.CharField(max_length=200, null=True, blank=True)
    sender_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="sender_name", null=True,
                                    blank=True)
    sender_address = models.TextField(max_length=2000, default=None, null=True)
    sender_phone = models.CharField(max_length=200, null=True, blank=True)

    # recipient_name = models.CharField(max_length=200, null=True, blank=True)
    recipient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="export_recipient_name",
                                       null=True, blank=True)
    recipient_address = models.TextField(max_length=2000, default=None, null=True)
    recipient_phone = models.CharField(max_length=200, null=True, blank=True)

    local_invoice = models.CharField(max_length=200, null=True, blank=True)
    awb = models.CharField(max_length=200, null=True, blank=True)
    # sponsor = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Exported_Sponsor", null=True,
                                blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Exported", null=True,
                                blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    courier = models.CharField(max_length=200, null=True, blank=True)
    # warehouse = models.CharField(max_length=200, null=True, blank=True)
    warehouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="Warehouse_Exported",
                                  null=True, blank=True)
    withdrawal_date = models.CharField(max_length=200, null=True, blank=True)
    verification = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StudyMaterialExportedDetails(AuditUuidModelMixin, ApprovalModel):
    study_material_exported = models.ForeignKey(StudyMaterialExported, default="", on_delete=models.CASCADE,
                                                related_name="study_material_exported_list")
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                related_name="study_material_exported_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    validity = models.CharField(max_length=200, null=True, blank=True)
    temp = models.CharField(max_length=200, null=True, blank=True)
    export_date = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ExpireDateChange(AuditUuidModelMixin, ApprovalModel):

    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Expire", null=True,
                                blank=True)
    document = models.CharField(max_length=200, null=True, blank=True)
    # warehouse = models.CharField(max_length=200, null=True, blank=True)
    warehouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="Warehouse_Expire",
                                  null=True, blank=True)
    moving_date = models.CharField(max_length=200, null=True, blank=True)
    verification = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ExpireDateChangeDetails(AuditUuidModelMixin, ApprovalModel):
    expire_date_change = models.ForeignKey(ExpireDateChange, default="", on_delete=models.CASCADE,
                                           related_name="expire_date_change_list")
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                related_name="expire_date_change_product", null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    serial_no = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    existent_date = models.CharField(max_length=200, null=True, blank=True)
    project = models.CharField(max_length=200, null=True, blank=True)
    updated_date = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


