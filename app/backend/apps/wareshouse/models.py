from django.db import models

from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel
from apps.masters.models import ProductMaster
from apps.sales.models import ProjectCreation


# Create your models here.

class WareHouseCreation(AuditUuidModelMixin, ApprovalModel):
    warehouse_name = models.CharField(max_length=200, null=True, blank=True)
    warehouse_code = models.CharField(max_length=200, null=True, blank=True)
    warehouse_address = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StorageZoneCreation(AuditUuidModelMixin, ApprovalModel):
    warehouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, null=True, blank=True)
    zone_name = models.CharField(max_length=200, null=True, blank=True)
    zone_code = models.CharField(max_length=200, null=True, blank=True)
    # barcode = models.CharField(max_length=200, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ZoneLevelCreation(AuditUuidModelMixin, ApprovalModel):
    storage_zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, null=True, blank=True)
    rack_code = models.CharField(max_length=200, null=True, blank=True)
    rack_name = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ZoneLevelCreationDetails(AuditUuidModelMixin, ApprovalModel):
    zone_level_creation = models.ForeignKey(ZoneLevelCreation, default="", on_delete=models.CASCADE,
                                            related_name="zone_level_list")
    level_name = models.CharField(max_length=200, null=True, blank=True)
    level_code = models.CharField(max_length=200, null=True, blank=True)
    min_weight = models.CharField(max_length=200, null=True, blank=True)
    max_weight = models.CharField(max_length=200, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)
    # barcode = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    rate_per_level = models.CharField(max_length=200, null=True, blank=True)
    currency_type = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ShelfCreation(AuditUuidModelMixin, ApprovalModel):
    storage_zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, null=True, blank=True)
    Rack = models.ForeignKey(ZoneLevelCreation, default="", on_delete=models.CASCADE,
                             related_name="rack_id", null=True, blank=True)
    zone_level = models.ForeignKey(ZoneLevelCreationDetails, default="", on_delete=models.CASCADE,
                                   related_name="zone_level")

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ShelfCreationDetails(AuditUuidModelMixin, ApprovalModel):
    shelf_creation = models.ForeignKey(ShelfCreation, default="", on_delete=models.CASCADE, null=True, blank=True,
                                       related_name="shelf_creation_list")
    shelf_name = models.CharField(max_length=200, null=True, blank=True)
    shelf_code = models.CharField(max_length=200, null=True, blank=True)
    min_weight = models.CharField(max_length=200, null=True, blank=True)
    max_weight = models.CharField(max_length=200, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)
    rate_per_shelf = models.CharField(max_length=200, null=True, blank=True)
    length = models.CharField(max_length=200, null=True, blank=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    height = models.CharField(max_length=200, null=True, blank=True)
    # barcode = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    currency_type = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class RackToRackTransfer(AuditUuidModelMixin, ApprovalModel):
    document = models.CharField(max_length=200, null=True, blank=True)
    # project = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE, related_name="Project_Rack", null=True,
                                blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class RackToRackTransferDetails(AuditUuidModelMixin, ApprovalModel):
    RackToRackTransfer = models.ForeignKey(RackToRackTransfer, default="", on_delete=models.CASCADE, null=True,
                                           blank=True,
                                           related_name="rack_to_rack_list")
    # product = models.CharField(max_length=200, null=True, blank=True)  # product id
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, null=True, blank=True,
                                related_name="rack_to_rack")
    kitNumber = models.CharField(max_length=200, null=True, blank=True)
    batchNumber = models.CharField(max_length=200, null=True, blank=True)
    serialNumber = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.CharField(max_length=200, null=True, blank=True)
    # fromRack = models.CharField(max_length=200, null=True, blank=True)  # id
    fromRack = models.ForeignKey(ZoneLevelCreationDetails, default="", on_delete=models.CASCADE,
                                 related_name="from_rack", null=True, blank=True)
    # fromShelf = models.CharField(max_length=200, null=True, blank=True)  # id
    fromShelf = models.ForeignKey(ShelfCreationDetails, default="", on_delete=models.CASCADE,
                                  related_name="from_shelf", null=True, blank=True)
    # toRack = models.CharField(max_length=200, null=True, blank=True)  # id
    toRack = models.ForeignKey(ZoneLevelCreationDetails, default="", on_delete=models.CASCADE,
                               related_name="to_rack", null=True, blank=True)
    # toShelf = models.CharField(max_length=200, null=True, blank=True)  # id
    toShelf = models.ForeignKey(ShelfCreationDetails, default="", on_delete=models.CASCADE,
                                related_name="to_shelf", null=True, blank=True)
    fromZone = models.ForeignKey(StorageZoneCreation, default="", on_delete=models.CASCADE,
                                 related_name="from_zone_id", null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StorageTypeCreation(AuditUuidModelMixin, ApprovalModel):
    storage_type = models.CharField(max_length=200, null=True, blank=True, unique=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class StorageTypeCreationDetails(AuditUuidModelMixin, ApprovalModel):
    storage_types = models.ForeignKey(StorageTypeCreation, default="", on_delete=models.CASCADE, null=True,
                                      blank=True,
                                      related_name="storage_type_creation_list")
    name = models.CharField(max_length=200, null=True, blank=True)
    code = models.CharField(max_length=200, null=True, blank=True)
    unitRate = models.CharField(max_length=200, null=True, blank=True)
    currency = models.CharField(max_length=200, null=True, blank=True)
    warehouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="st_ware_house_id",
                                  null=True,
                                  blank=True)
    zone = models.ForeignKey(StorageZoneCreation, on_delete=models.CASCADE, related_name="st_zone_id", null=True,
                             blank=True)
    rack = models.ForeignKey(ZoneLevelCreation, on_delete=models.CASCADE, related_name="st_racks_id", null=True,
                             blank=True)
    level = models.ForeignKey(ZoneLevelCreationDetails, on_delete=models.CASCADE, related_name="st_level_id", null=True,
                              blank=True)
    shelf = models.ForeignKey(ShelfCreationDetails, on_delete=models.CASCADE, related_name="st_shelf_id", null=True,
                              blank=True)
    minTemp = models.CharField(max_length=200, null=True, blank=True)
    maxTemp = models.CharField(max_length=200, null=True, blank=True)
    length = models.CharField(max_length=200, null=True, blank=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    height = models.CharField(max_length=200, null=True, blank=True)
    maxStorage = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


# class GoodsAcceptance(AuditUuidModelMixin, ApprovalModel):
#     materialReceipt = models.ForeignKey('inventory.MaterialReceipt', default="", on_delete=models.CASCADE, null=True,
#                                         blank=True,
#                                         related_name="MaterialReceipt")
#     supplier_name = models.CharField(max_length=200, null=True, blank=True)
#     supplier_address = models.CharField(max_length=200, null=True, blank=True)
#     supplier_phone = models.CharField(max_length=200, null=True, blank=True)
#     receipient_name = models.CharField(max_length=200, null=True, blank=True)
#     recepient_address = models.CharField(max_length=200, null=True, blank=True)
#     receipent_phone = models.CharField(max_length=200, null=True, blank=True)
#     invoice = models.CharField(max_length=200, null=True, blank=True)
#     invoice_in = models.CharField(max_length=200, null=True, blank=True)
#     carrier_invoice = models.CharField(max_length=200, null=True, blank=True)
#     awb = models.CharField(max_length=200, null=True, blank=True)
#     sponser = models.CharField(max_length=200, null=True, blank=True)
#     protocol = models.CharField(max_length=200, null=True, blank=True)
#     project = models.CharField(max_length=200, null=True, blank=True)
#     weight = models.CharField(max_length=200, null=True, blank=True)
#     size = models.CharField(max_length=200, null=True, blank=True)
#     box_quantity = models.CharField(max_length=200, null=True, blank=True)
#
#
# class GoodsAcceptanceDetails(AuditUuidModelMixin, ApprovalModel):
#     goods_acceptance = models.ForeignKey(GoodsAcceptance, default="", on_delete=models.CASCADE, null=True, blank=True,
#                                          related_name="goods_acceptance_list")
#     product_name = models.CharField(max_length=200, null=True, blank=True)
#     product_code = models.CharField(max_length=200, null=True, blank=True)
#     quantity = models.CharField(max_length=200, null=True, blank=True)
#     kit_number = models.CharField(max_length=200, null=True, blank=True)
#     batch_number = models.CharField(max_length=200, null=True, blank=True)
#     serial_number = models.CharField(max_length=200, null=True, blank=True)
#     validity = models.CharField(max_length=200, null=True, blank=True)
#     manufacturer = models.CharField(max_length=200, null=True, blank=True)
#     temp_in_degree = models.CharField(max_length=200, null=True, blank=True)
#     note = models.CharField(max_length=200, null=True, blank=True)


class ZoneToZoneTransfer(AuditUuidModelMixin, ApprovalModel):
    document = models.CharField(max_length=200, null=True, blank=True)
    transferDate = models.CharField(max_length=200, null=True, blank=True)
    invoice = models.CharField(max_length=200, null=True, blank=True)
    wareHouse = models.ForeignKey(WareHouseCreation, on_delete=models.CASCADE, related_name="warehouse_id", null=True,
                                  blank=True)
    fromZone = models.ForeignKey(StorageZoneCreation, default="", on_delete=models.CASCADE,
                                 related_name="from_zone", null=True, blank=True)
    # toZone = models.CharField(max_length=200, null=True, blank=True)  # id
    toZone = models.ForeignKey(StorageZoneCreation, default="", on_delete=models.CASCADE,
                               related_name="to_zone", null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class ZoneToZoneTransferDetails(AuditUuidModelMixin, ApprovalModel):
    ZoneToZoneTransfer = models.ForeignKey(ZoneToZoneTransfer, default="", on_delete=models.CASCADE, null=True,
                                           blank=True,
                                           related_name="zone_to_zone_list")
    # product = models.CharField(max_length=200, null=True, blank=True)  # product id
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE, null=True, blank=True,
                                related_name="zone_to_zone")
    kitNumber = models.CharField(max_length=200, null=True, blank=True)
    batchNumber = models.CharField(max_length=200, null=True, blank=True)
    serialNumber = models.CharField(max_length=200, null=True, blank=True)
    trc_number = models.CharField(max_length=200, null=True, blank=True)
    trc_date = models.CharField(max_length=200, null=True, blank=True)
    expiry_date = models.CharField(max_length=200, null=True, blank=True)
    manufacturer = models.CharField(max_length=200, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)
    received_qty = models.CharField(max_length=200, null=True, blank=True)
    available_qty = models.CharField(max_length=200, null=True, blank=True)

    # fromZone = models.CharField(max_length=200, null=True, blank=True)  # id

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)


class PalletCreation(AuditUuidModelMixin, ApprovalModel):
    pallet_number = models.CharField(max_length=200, null=False, unique=True)
    pallet_type = models.CharField(max_length=100, null=False)

    class Meta:
        pass


class Refrigeration(AuditUuidModelMixin, ApprovalModel):
    refrigerator_number = models.CharField(max_length=200, null=False, unique=True)
    refrigerator_type = models.CharField(max_length=100, null=False)

    class Meta:
        pass
