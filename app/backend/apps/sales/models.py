from django.db import models

from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel
from apps.company.models import Company
from apps.masters.models import PartyMaster
from apps.masters.models import ProductMaster
from apps.masters.models import UnitMaster
# Create your models here.


class ContractReview(AuditUuidModelMixin,ApprovalModel):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    contract_review_no = models.CharField(max_length=200, unique=True)
    date = models.CharField(max_length=200, null=True, blank=True)
    cr_type = models.CharField(max_length=200, null=True, blank=True)
    # feasibility_review = models.ForeignKey("marketing.FeasibilityReview", default="", on_delete=models.CASCADE,
    #                                        null=True, blank=True)
    customer = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, null=True, blank=True)
    review_details = models.TextField(default="", null=True, blank=True)
    review_status = models.CharField(max_length=250, default=None, null=True, blank=True)
    remarks = models.TextField(max_length=4000, null=True, blank=True)
 

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class OrderAcceptance(AuditUuidModelMixin,ApprovalModel):
    company = models.ForeignKey( Company, on_delete=models.CASCADE, null=True, blank=True)
    # casting_type = models.CharField(max_length=200, default="", null=True, blank=True)
    oa_date = models.CharField(max_length=200, null=True, blank=True)
    oa_number = models.CharField(max_length=200, unique=True, blank=True, null=True)
    contract_review = models.ForeignKey(ContractReview, default="", on_delete=models.CASCADE,null=True)
    customer = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, null=True, blank=True)
    customer_po_no_date = models.TextField(max_length=50, default="", blank=True)
    total_value = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    # delivery_schedule = models.TextField(max_length=1000, default="", blank=True)
    For = models.TextField(max_length=1000, default="", blank=True)
    destination = models.TextField(max_length=1000, default="", blank=True)
    tax = models.TextField(max_length=1000, default="", blank=True)
    frieght = models.TextField(max_length=1000, default="", blank=True)
    dispatch = models.TextField(max_length=1000, default="", blank=True)
    terms_of_payment = models.TextField(max_length=1000, default="", blank=True)
    documents = models.CharField(max_length=1000, null=True, default=None, blank=True)
    banker_name = models.CharField(max_length=500, null=True, default=None, blank=True)
    branch_details = models.CharField(max_length=250, null=True, default=None, blank=True)
    account = models.CharField(max_length=250, null=True, default=None, blank=True)
    account1 = models.CharField(max_length=250, null=True, default=None, blank=True)


    def __str__(self):
        return self.oa_number


class OrderAcceptanceDetails(AuditUuidModelMixin):
    oa = models.ForeignKey(OrderAcceptance, default="", on_delete=models.CASCADE)
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, default="")
    product_code = models.CharField(max_length=50, null=True, default=None, blank=True)
    # hsn_code = models.CharField(max_length=50, null=True, default=None, blank=True)
    product_name = models.CharField(max_length=255, null=True, default=None, blank=True)
    description = models.TextField(max_length=1000, default="", blank=True, null=True)
    date = models.CharField(max_length=255, null=True, default=None, blank=True)
    qty = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    pf_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    frieght = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    unit = models.ForeignKey(UnitMaster, on_delete=models.CASCADE, default="")
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)

    class Meta:
        pass


class ProjectCreation(AuditUuidModelMixin, ApprovalModel):
    project_name = models.CharField(max_length=250, null=True, blank=True)
    project_code = models.CharField(max_length=250, null=True, blank=True, unique=True)
    created_date = models.CharField(max_length=200, null=True, blank=True)
    loading_date = models.CharField(max_length=200, null=True, blank=True)
    shipment_date = models.CharField(max_length=200, null=True, blank=True)
    storage_days = models.CharField(max_length=250, null=True, blank=True)
    # From
    from_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="from_party_master",
                                  null=True, blank=True)
    from_address = models.TextField(default=None, null=True, blank=True)
    zipcode = models.CharField(max_length=250, null=True, blank=True)
    study_number = models.CharField(max_length=250, null=True, blank=True)
    protocol_number = models.CharField(max_length=250, null=True, blank=True)
    order_number = models.CharField(max_length=250, null=True, blank=True)
    contact_no = models.CharField(max_length=250, null=True, blank=True)
    contact_person = models.CharField(max_length=250, null=True, blank=True)
    email = models.CharField(max_length=250, null=True, blank=True)
    invoice_number = models.CharField(max_length=250, null=True, blank=True)
    awb_no = models.CharField(max_length=250, null=True, blank=True)
    proforma_invoice = models.CharField(max_length=250, null=True, blank=True)
    invoice_type = models.CharField(max_length=250, null=True, blank=True)
    # To
    to_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="to_party_master",
                                null=True, blank=True)
    to_address = models.TextField(default=None, null=True, blank=True)
    to_zipcode = models.CharField(max_length=250, null=True, blank=True)
    # Shipping Condition
    temp_controlled = models.BooleanField(default=False)
    min_temp = models.CharField(max_length=250, null=True, blank=True)
    max_temp = models.CharField(max_length=250, null=True, blank=True)
    # Storage Condition
    ambient_controlled = models.BooleanField(default=False)
    ambient_note = models.TextField(default=None, null=True, blank=True)
    # Document Details
    document_no = models.CharField(max_length=250, null=True, blank=True)
    effective_date = models.CharField(max_length=250, null=True, blank=True)
    sop_related_to = models.CharField(max_length=250, null=True, blank=True)
    note = models.TextField(default=None, null=True, blank=True)
    # Approver
    name = models.CharField(max_length=250, null=True, blank=True)
    title = models.CharField(max_length=250, null=True, blank=True)
    locations = models.CharField(max_length=250, null=True, blank=True)
    date = models.CharField(max_length=200, null=True, blank=True)
    signature = models.CharField(max_length=250, null=True, blank=True)
    # Table total
    total_quantity = models.CharField(max_length=250, null=True, blank=True)
    total_Weight = models.CharField(max_length=250, null=True, blank=True)
    grand_total = models.CharField(max_length=250, null=True, blank=True)
    # documents = models.TextField(default=None, null=True, blank=True)

    class Meta:
        pass


class ProjectCreationDetails(AuditUuidModelMixin, ApprovalModel):
    project_creation = models.ForeignKey(ProjectCreation, default="", on_delete=models.CASCADE,
                                         related_name="project_creation_list", blank=True)
    # product = models.TextField(max_length=1000, null=True, blank=True)
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE,
                                related_name="project_product", null=True, blank=True)
    batch_no = models.CharField(max_length=200, null=True, blank=True)
    expiry_date = models.TextField(max_length=1000, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    hs_code = models.CharField(max_length=200, null=True, blank=True)
    net_weight = models.CharField(max_length=200, null=True, blank=True)
    unit_value = models.CharField(max_length=200, null=True, blank=True)
    total_value = models.CharField(max_length=200, null=True, blank=True)
    currency_type = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass


class ProjectCreationFileUpload(models.Model):
    project_creation = models.ForeignKey(ProjectCreation, default="", on_delete=models.CASCADE,
                                         related_name="file_upload", blank=True)
    file = models.FileField(upload_to="images", null=True, blank=True, default=None)

    def __str__(self):
        return str(self.project_creation)


class ProformaKitCreation(AuditUuidModelMixin, ApprovalModel):
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, null=True, blank=True)
    kit_name = models.CharField(max_length=200, null=True, blank=True)
    kit_qty = models.CharField(max_length=200, null=True, blank=True)
    kit_value = models.CharField(max_length=200, null=True, blank=True)
    total_units = models.CharField(max_length=200, null=True, blank=True)
    total_price = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ProformaKitCreationDetails(AuditUuidModelMixin, ApprovalModel):
    ProformaKitCreation = models.ForeignKey(ProformaKitCreation, default="", on_delete=models.CASCADE, null=True,
                                            blank=True,
                                            related_name="productList")
    # product_name = models.CharField(max_length=200, null=True, blank=True)
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, null=True, blank=True)
    product_code = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=200, null=True, blank=True)
    unit_price = models.CharField(max_length=200, null=True, blank=True)
    price = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class CMTRFCreation(AuditUuidModelMixin, ApprovalModel):
    protocol = models.CharField(max_length=100, null=True, blank=True)
    depot = models.CharField(max_length=100, null=True, blank=True)
    order_no = models.CharField(max_length=100, null=True, blank=True)
    batch_no = models.CharField(max_length=100, null=True, blank=True)
    receiver_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="ctmrf_party_master",
                                      null=True, blank=True)

    class Meta:
        pass


class CMTRFCreationDetails(AuditUuidModelMixin, ApprovalModel):
    cmtrf_creation = models.ForeignKey(CMTRFCreation, default="", on_delete=models.CASCADE,
                                       related_name="cmtrf_list", blank=True)
    item = models.CharField(max_length=100, null=True, blank=True)
    quantity = models.CharField(max_length=100, null=True, blank=True)
    product = models.CharField(max_length=200, null=True, blank=True)
    expiry_date = models.CharField(max_length=100, null=True, blank=True)
    kit_no = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        pass


class CMTRFAcknowledgementDetails(AuditUuidModelMixin, ApprovalModel):
    cmtrf_creation = models.ForeignKey(CMTRFCreation, default="", on_delete=models.CASCADE,
                                       related_name="acknowledgement_list", blank=True)
    container = models.CharField(max_length=100, null=True, blank=True)
    data_logger = models.CharField(max_length=100, null=True, blank=True)
    alarm = models.BooleanField(default=False)

    class Meta:
        pass
