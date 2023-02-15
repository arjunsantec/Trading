from apps.wareshouse.models import ShelfCreation, ShelfCreationDetails, StorageZoneCreation, WareHouseCreation, \
    ZoneLevelCreation, ZoneLevelCreationDetails
from apps.audit_fields.models import AuditUuidModelMixin
from django.db import models

# Create your models here.
from apps.masters.models import ProductMaster, PartyMaster
from apps.sales.models import ProjectCreation

from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel


class MaterialReceipt(AuditUuidModelMixin):
    supplier_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master", null=True,
                                      blank=True)
    materialReceiptCode = models.CharField(max_length=200, null=True, blank=True)
    # material_receipt_code=models.CharField(max_length=200, null=True, blank=True)
    # inward_type = models.CharField(max_length=30, blank=True)
    po_number = models.CharField(max_length=30, blank=True)
    po_date = models.DateTimeField(blank=True, null=True)
    supplier_invoice_number = models.CharField(max_length=100, blank=True)
    courier_no = models.CharField(max_length=100, blank=True)
    awb = models.CharField(max_length=100, blank=True)
    # supplier_name = models.CharField(max_length=100, blank=True,null=True,)
    supplier_address = models.CharField(max_length=200, blank=True)
    supplier_phone = models.CharField(max_length=100, blank=True)
    delivery_challan_no = models.CharField(max_length=100, blank=True)
    corgo_type = models.CharField(max_length=100, blank=True)
    # sponsor = models.CharField(max_length=100, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Material_Sponsor",
                                null=True, blank=True)
    portocol = models.CharField(max_length=100, blank=True)
    # project = models.CharField(max_length=100, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Creation", null=True,
                                blank=True)
    weight = models.FloatField(null=True, blank=True, default=None)
    size = models.FloatField(null=True, blank=True, default=None)
    box_qty = models.FloatField(null=True, blank=True, default=None)
    request_approval = models.CharField(max_length=100, blank=True)
    approval_on_deviatior = models.CharField(max_length=100, blank=True)
    recipient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master_recipient",
                                       null=True,
                                       blank=True)
    # recipient_name = models.CharField(max_length=100, blank=True)
    recipient_address = models.CharField(max_length=100, blank=True)
    recipient_phone = models.CharField(max_length=100, blank=True)
    is_approved = models.CharField(max_length=200, null=True, blank=True, default='PENDING')
    invoice = models.CharField(max_length=200, null=True, blank=True)
    invoice_in = models.CharField(max_length=200, null=True, blank=True)
    carrier_invoice = models.CharField(max_length=200, null=True, blank=True)
    receive_date = models.CharField(max_length=100, blank=True, null=True)
    courier = models.CharField(max_length=100, null=True, blank=True)
    study_number = models.CharField(max_length=100, null=True, blank=True)
    order_number = models.CharField(max_length=100, null=True, blank=True)
    inco_terms = models.CharField(max_length=500, default=None, null=True)
    shipping_condition = models.BooleanField(default=False)
    storage_condition = models.BooleanField(default=False)

    class Meta:
        pass


class GRNDetails(AuditUuidModelMixin):
    material_receipt = models.ForeignKey(
        MaterialReceipt, on_delete=models.CASCADE, related_name="grn_details", null=True, blank=True)
    product_code = models.CharField(max_length=30, blank=True)
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, related_name="product", null=True, blank=True)
    trc_no = models.CharField(max_length=30, blank=True)
    trc_date = models.DateField()
    kit_no = models.CharField(max_length=100, blank=True)
    batch_no = models.CharField(max_length=50, blank=True)
    expiry = models.CharField(max_length=30, blank=True)
    serial_number = models.CharField(max_length=30, blank=True)
    manufacture = models.CharField(max_length=30, blank=True)
    min_temp = models.CharField(max_length=30, blank=True)
    max_temp = models.CharField(max_length=30, blank=True)
    recevied_qty = models.CharField(max_length=50, blank=True)
    # unit = models.CharField(max_length=30, blank=True)
    # unit_price = models.CharField(max_length=30, blank=True)
    # base_price = models.CharField(max_length=30, blank=True)
    # gst = models.CharField(max_length=30, blank=True)
    # unit_net_price = models.CharField(max_length=30, blank=True)
    # net_price = models.CharField(max_length=30, blank=True)
    ware_house = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="ware_house", null=True,
                                   blank=True)
    zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, related_name="zone", null=True, blank=True)
    # rack = models.ForeignKey(ZoneLevelCreationDetails, on_delete=models.CASCADE, related_name="rack", null=True, blank=True)
    # shelf = models.ForeignKey(ShelfCreationDetails, on_delete=models.CASCADE, related_name="shelf", null=True, blank=True)
    note = models.CharField(max_length=200, blank=True)
    is_flag = models.BooleanField(default=True)

    class Meta:
        pass


class GoodsAcceptance(AuditUuidModelMixin, ApprovalModel):
    materialReceipt = models.ForeignKey('inventory.MaterialReceipt', default="", on_delete=models.CASCADE, null=True,
                                        blank=True,
                                        related_name="MaterialReceipt")
    # supplier_name = models.CharField(max_length=200, null=True, blank=True)
    supplier_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master_id", null=True,
                                      blank=True)

    supplier_address = models.CharField(max_length=200, null=True, blank=True)
    supplier_phone = models.CharField(max_length=200, null=True, blank=True)
    # receipient_name = models.CharField(max_length=200, null=True, blank=True)
    recipient_name = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Party_Master_recipient_id",
                                       null=True, blank=True)

    recepient_address = models.CharField(max_length=200, null=True, blank=True)
    receipent_phone = models.CharField(max_length=200, null=True, blank=True)
    invoice = models.CharField(max_length=200, null=True, blank=True)
    invoice_in = models.CharField(max_length=200, null=True, blank=True)
    carrier_invoice = models.CharField(max_length=200, null=True, blank=True)
    awb = models.CharField(max_length=200, null=True, blank=True)
    # sponser = models.CharField(max_length=200, null=True, blank=True)
    sponsor = models.ForeignKey(PartyMaster, on_delete=models.CASCADE, related_name="Acceptance_Sponsor",
                                null=True, blank=True)
    protocol = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Creations", null=True,
                                blank=True)
    weight = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    box_quantity = models.CharField(max_length=200, null=True, blank=True)
    receive_date = models.CharField(max_length=100, blank=True, null=True)
    courier = models.CharField(max_length=100, null=True, blank=True)
    study_number = models.CharField(max_length=100, null=True, blank=True)
    order_number = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True)
    # courier = models.CharField(max_length=100, null=True, blank=True)


class GoodsAcceptanceDetails(AuditUuidModelMixin, ApprovalModel):
    goods_acceptance = models.ForeignKey(GoodsAcceptance, default="", on_delete=models.CASCADE, null=True, blank=True,
                                         related_name="goods_acceptance_list")
    # product_name = models.CharField(max_length=200, null=True, blank=True)
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, related_name="Product_ID", null=True,
                                blank=True)

    product_code = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    rejected_quantity = models.CharField(max_length=200, null=True, blank=True)
    accepted_quantity = models.CharField(max_length=200, null=True, blank=True)
    kit_number = models.CharField(max_length=200, null=True, blank=True)
    batch_number = models.CharField(max_length=200, null=True, blank=True)
    serial_number = models.CharField(max_length=200, null=True, blank=True)
    validity = models.CharField(max_length=200, null=True, blank=True)
    manufacturer = models.CharField(max_length=200, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)
    note = models.CharField(max_length=200, null=True, blank=True)
    ware_house = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="WareHouse_ID", null=True,
                                   blank=True)
    zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, related_name="Zone_ID", null=True,
                             blank=True)
    # rack = models.ForeignKey(ZoneLevelCreationDetails, on_delete=models.CASCADE, related_name="Rack_ID", null=True,
    #                          blank=True)
    # shelf = models.ForeignKey(ShelfCreationDetails, on_delete=models.CASCADE, related_name="Shelf_ID", null=True,
    #                           blank=True)
    trc_no = models.CharField(max_length=30, blank=True)
    trc_date = models.DateField(null=True, blank=True)

    class Meta:
        pass


class ProductTagging(AuditUuidModelMixin):
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, null=True, blank=True,
                                related_name="product_tag")
    goods_details = models.ForeignKey(GoodsAcceptanceDetails, on_delete=models.CASCADE, null=True, blank=True,
                                      related_name="goods_details")
    trc_no = models.CharField(max_length=30, blank=True)
    trc_date = models.CharField(max_length=30, blank=True)
    kit_no = models.CharField(max_length=100, blank=True)
    batch_no = models.CharField(max_length=50, blank=True)
    expiry = models.CharField(max_length=30, blank=True)
    serial_number = models.CharField(max_length=30, blank=True)
    manufacture = models.CharField(max_length=30, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)
    recevied_qty = models.CharField(max_length=50, blank=True)
    available_qty = models.CharField(max_length=50, blank=True)
    price = models.DecimalField(max_digits=20, null=True, blank=True,decimal_places=2)
    ware_house = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="ware_house_id", null=True,
                                   blank=True)
    zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, related_name="zone_id", null=True,
                             blank=True)
    rack = models.ForeignKey(ZoneLevelCreation, on_delete=models.CASCADE, related_name="racks_id", null=True,
                             blank=True)
    level = models.ForeignKey(ZoneLevelCreationDetails, on_delete=models.CASCADE, related_name="level_id", null=True,
                              blank=True)
    shelf = models.ForeignKey(ShelfCreationDetails, on_delete=models.CASCADE, related_name="shelf_id", null=True,
                              blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_p_tagging",
                                null=True, blank=True)
    storage_type = models.CharField(max_length=200, null=True, blank=True)
    type_name = models.CharField(max_length=200, null=True, blank=True)
    load_date = models.CharField(max_length=200, null=True, blank=True)
    unload_date = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass
