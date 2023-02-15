import ast

from django.db.models import Q
# from pandas import array
from rest_framework import serializers
from . import models
from apps.utils.number_constuctor import NumberConstructor
from apps.utils.constants import NumberConstructorConstants
from apps.inventory.models import ProductTagging
from .models import WareHouseCreation, ZoneLevelCreation, ZoneLevelCreationDetails, StorageZoneCreation
from apps.sales.models import ProjectCreation
from apps.masters.models import ProductMaster


class WareHouseCreationSerializer(serializers.ModelSerializer):
    wareHouseName = serializers.CharField(max_length=150, allow_blank=True, source="warehouse_name")
    wareHouseCode = serializers.CharField(max_length=150, allow_blank=True, source="warehouse_code")
    wareHouseAddress = serializers.CharField(max_length=150, allow_blank=True, source="warehouse_address")

    class Meta:
        model = models.WareHouseCreation
        fields = [
            'id',
            'wareHouseName',
            'wareHouseCode',
            'wareHouseAddress',
        ]

    def create(self, validated_data):
        # ware_house_obj = super().create(validated_data)
        # ware_house_obj.warehouse_code = NumberConstructor().generate_next_sequence(
        #     NumberConstructorConstants.WARE_HOUSE_NUMBERING, False)

        validated_data['warehouse_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                      WARE_HOUSE_NUMBERING, False)
        ware_house_obj = models.WareHouseCreation.objects.create(**validated_data)
        ware_house_obj.save()

        return ware_house_obj


class StorageZoneCreationSerializer(serializers.ModelSerializer):
    # wareHouse = serializers.CharField(max_length=50, allow_blank=True, source="warehouse")
    wareHouse = serializers.PrimaryKeyRelatedField(queryset=WareHouseCreation.objects.all(), source='warehouse')
    zoneName = serializers.CharField(max_length=50, allow_blank=True, source="zone_name")
    zoneCode = serializers.CharField(max_length=50, allow_blank=True, source="zone_code")
    # barCode = serializers.CharField(max_length=50, allow_blank=True, source="barcode")
    minTemp = serializers.CharField(max_length=50, allow_blank=True, source="min_temp")
    maxTemp = serializers.CharField(max_length=50, allow_blank=True, source="max_temp")

    class Meta:
        model = models.StorageZoneCreation
        fields = [
            'id',
            'wareHouse',
            'zoneName',
            'zoneCode',
            # 'barCode',
            'minTemp',
            'maxTemp'
        ]

    def create(self, validated_data):
        # storage_zone_obj = super().create(validated_data)
        # storage_zone_obj.zone_code = NumberConstructor().generate_next_sequence(
        #     NumberConstructorConstants.STORAGE_ZONE_NUMBERING, False)
        validated_data['zone_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                 STORAGE_ZONE_NUMBERING, False)
        storage_zone_obj = models.StorageZoneCreation.objects.create(**validated_data)
        storage_zone_obj.save()

        return storage_zone_obj

    def to_representation(self, instance):
        data = super(StorageZoneCreationSerializer, self).to_representation(instance)
        storageZone_list = models.StorageZoneCreation.objects.filter(id=data['id']).all().values('warehouse')[0]
        data['warehouseName'] = \
            models.WareHouseCreation.objects.filter(id=storageZone_list['warehouse']).all().values('warehouse_name')[0][
                'warehouse_name']
        return data


class ZoneLevelCreationDetailSerializer(serializers.ModelSerializer):
    # zoneLevelCreation = serializers.CharField(max_length=50, allow_blank=True, source="zone_level_creation")
    # zoneLevelCreation = serializers.PrimaryKeyRelatedField(queryset=ZoneLevelCreation.objects.all(),
    #                                                        source='zone_level_creation')
    levelName = serializers.CharField(max_length=50, allow_blank=True, source="level_name")
    levelCode = serializers.CharField(max_length=50, allow_blank=True, source="level_code")
    minWeight = serializers.CharField(max_length=50, allow_blank=True, source="min_weight")
    maxWeight = serializers.CharField(max_length=50, allow_blank=True, source="max_weight")
    minTemp = serializers.CharField(max_length=50, allow_blank=True, source="min_temp")
    maxTemp = serializers.CharField(max_length=50, allow_blank=True, source="max_temp")
    # barCode = serializers.CharField(max_length=50, allow_blank=True, source="barcode")
    # description = serializers.CharField(max_length=50, allow_blank=True, source="description")
    ratePerLevel = serializers.CharField(max_length=50, allow_blank=True, source="rate_per_level")
    currencyType = serializers.CharField(max_length=50, allow_blank=True, source="currency_type")

    class Meta:
        model = models.ZoneLevelCreationDetails
        fields = [
            'id',
            'zone_level_creation',
            'levelName',
            'levelCode',
            'minWeight',
            'maxWeight',
            'minTemp',
            'maxTemp',
            # 'barCode',
            'description',
            'ratePerLevel',
            'currencyType',
        ]


class ZoneLevelCreationSerializer(serializers.ModelSerializer):
    # storageZone = serializers.CharField(max_length=50, allow_blank=True, source="storage_zone")
    storageZone = serializers.PrimaryKeyRelatedField(queryset=StorageZoneCreation.objects.all(),
                                                     source='storage_zone')
    zone_level_list = ZoneLevelCreationDetailSerializer(many=True)
    rackCode = serializers.CharField(max_length=50, allow_blank=True, source="rack_code")
    rackName = serializers.CharField(max_length=100, allow_blank=True, source="rack_name")

    class Meta:
        model = models.ZoneLevelCreation
        fields = [
            'id',
            'storageZone',
            'zone_level_list',
            'rackCode',
            'rackName'
        ]

    def create(self, validated_data):
        zone_level_list = validated_data.pop('zone_level_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        validated_data['rack_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                 RACK_NUMBERING,
                                                                                 False)
        zone = models.ZoneLevelCreation.objects.create(**validated_data)
        for item in zone_level_list:
            models.ZoneLevelCreationDetails.objects.create(
                zone_level_creation=zone, **item)
        # zone.rack_code = NumberConstructor().generate_next_sequence(
        #     NumberConstructorConstants.RACK_NUMBERING, False)
        zone.save()
        return zone

    def update(self, instance, validated_data):
        validated_data.pop('zone_level_list')
        id = list(models.ZoneLevelCreationDetails.objects.filter(zone_level_creation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        zone_level_list = self.initial_data['zone_level_list']
        enquiry = models.ZoneLevelCreation.objects.filter(
            id=instance.id).update(**validated_data)
        for item in zone_level_list:
            list2_id.append(item['id'])
            if models.ZoneLevelCreationDetails.objects.filter(id=item['id']).exists():
                models.ZoneLevelCreationDetails.objects.filter(
                    id=item['id']).update(
                    zone_level_creation_id=item['zone_level_creation'],
                    level_name=item['levelName'],
                    level_code=item['levelCode'], min_weight=item['minWeight'],
                    max_weight=item['maxWeight'], min_temp=item['minTemp'],
                    max_temp=item['maxTemp'],
                    description=item['description'], rate_per_level=item['ratePerLevel'],
                    currency_type=item['currencyType'])
            else:
                models.ZoneLevelCreationDetails.objects.create(
                    zone_level_creation=instance,
                    # zone_level_creation_id=
                    level_name=item['levelName'],
                    level_code=item['levelCode'], min_weight=item['minWeight'],
                    max_weight=item['maxWeight'], min_temp=item['minTemp'],
                    max_temp=item['maxTemp'],
                    description=item['description'], rate_per_level=item['ratePerLevel'],
                    currency_type=item['currencyType'])

                # levelName=item['levelName'],
                # levelCode=item['levelCode'], minWeight=item['minWeight'],**item)
                # maxWeight=item['maxWeight'], minTemp=item['minTemp'],
                # maxTemp=item['maxTemp'], barCode=item['barCode'],
                # description=item['description'], ratePerLevel=item['ratePerLevel'])
        dif = [i for i in list1_id if i not in list2_id]
        models.ZoneLevelCreationDetails.objects.filter(id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(ZoneLevelCreationSerializer, self).to_representation(instance)
        zoneLevel_list = models.ZoneLevelCreation.objects.filter(id=data['id']).all().values('storage_zone')[0]
        data['zoneName'] = \
            models.StorageZoneCreation.objects.filter(id=zoneLevel_list['storage_zone']).all().values('zone_name')[0][
                'zone_name']
        return data


class ShelfCreationDetailsSerializer(serializers.ModelSerializer):
    # shelf_creation = serializers.CharField(max_length=50, allow_blank=True, source="shelf_creation")
    shelfName = serializers.CharField(max_length=50, allow_blank=True, source="shelf_name")
    shelfCode = serializers.CharField(max_length=50, allow_blank=True, source="shelf_code")
    minWeight = serializers.CharField(max_length=50, allow_blank=True, source="min_weight")
    maxWeight = serializers.CharField(max_length=50, allow_blank=True, source="max_weight")
    minTemp = serializers.CharField(max_length=50, allow_blank=True, source="min_temp")
    maxTemp = serializers.CharField(max_length=50, allow_blank=True, source="max_temp")
    ratePerShelf = serializers.CharField(max_length=50, allow_blank=True, source="rate_per_shelf")
    currencyType = serializers.CharField(max_length=50, allow_blank=True, source="currency_type")

    # length = serializers.CharField(max_length=50, allow_blank=True, source="length")
    # width = serializers.CharField(max_length=50, allow_blank=True, source="width")
    # height = serializers.CharField(max_length=50, allow_blank=True, source="height")
    # barCode = serializers.CharField(max_length=50, allow_blank=True, source="barcode")

    # description = serializers.CharField(max_length=50, allow_blank=True, source="description")

    class Meta:
        model = models.ShelfCreationDetails
        fields = [
            'id',
            'shelf_creation',
            'shelfName',
            'shelfCode',
            'minWeight',
            'maxWeight',
            'minTemp',
            'maxTemp',
            'ratePerShelf',
            'length',
            'width',
            'height',
            # 'barCode',
            'description',
            'status',
            'currencyType',
        ]


class ShelfCreationSerializer(serializers.ModelSerializer):
    # zoneLevel = serializers.CharField(max_length=50, allow_blank=True, source="zone_level")
    storageZone = serializers.PrimaryKeyRelatedField(queryset=StorageZoneCreation.objects.all(),
                                                     source='storage_zone')
    zoneLevel = serializers.PrimaryKeyRelatedField(queryset=ZoneLevelCreationDetails.objects.all(),
                                                   source='zone_level')
    rackName = serializers.PrimaryKeyRelatedField(queryset=ZoneLevelCreation.objects.all(),
                                                  source='Rack')
    shelf_creation_list = ShelfCreationDetailsSerializer(many=True)

    class Meta:
        model = models.ShelfCreation
        fields = [
            'id',
            'storageZone',
            'zoneLevel',
            'rackName',
            'shelf_creation_list',
        ]

    def create(self, validated_data):
        shelf_creation_list = validated_data.pop('shelf_creation_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        shelf = models.ShelfCreation.objects.create(**validated_data)
        for item in shelf_creation_list:
            models.ShelfCreationDetails.objects.create(
                shelf_creation=shelf, **item)

        return shelf

    def update(self, instance, validated_data):
        validated_data.pop('shelf_creation_list')
        id = list(models.ShelfCreationDetails.objects.filter(shelf_creation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        shelf_creation_list = self.initial_data['shelf_creation_list']
        zone = models.ShelfCreation.objects.filter(
            id=instance.id).update(**validated_data)
        for item in shelf_creation_list:
            list2_id.append(item['id'])
            # print(item)
            if models.ShelfCreationDetails.objects.filter(id=item['id']).exists():
                models.ShelfCreationDetails.objects.filter(
                    id=item['id']).update(
                    shelf_creation_id=item['shelf_creation'],
                    shelf_name=item['shelfName'],
                    shelf_code=item['shelfCode'], min_weight=item['minWeight'],
                    max_weight=item['maxWeight'], min_temp=item['minTemp'],
                    max_temp=item['maxTemp'], rate_per_shelf=item['ratePerShelf'],
                    description=item['description'], width=item['width'],
                    height=item['height'], length=item['length'],
                    status=item['status'], currency_type=item['currencyType']
                )
            else:
                models.ShelfCreationDetails.objects.create(
                    shelf_creation=instance,
                    shelf_name=item['shelfName'],
                    shelf_code=item['shelfCode'], min_weight=item['minWeight'],
                    max_weight=item['maxWeight'], min_temp=item['minTemp'],
                    max_temp=item['maxTemp'], rate_per_shelf=item['ratePerShelf'],
                    description=item['description'], width=item['width'],
                    height=item['height'], length=item['length'],
                    status=item['status'], currency_type=item['currencyType']
                )
        dif = [i for i in list1_id if i not in list2_id]
        models.ShelfCreationDetails.objects.filter(id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(ShelfCreationSerializer, self).to_representation(instance)
        shelfcreation_list = \
            models.ShelfCreation.objects.filter(id=data['id']).all().values('storage_zone', 'zone_level')[0]
        data['zoneName'] = \
            models.StorageZoneCreation.objects.filter(id=shelfcreation_list['storage_zone']).all().values('zone_name')[
                0][
                'zone_name']
        data['levelName'] = \
            models.ZoneLevelCreationDetails.objects.filter(id=shelfcreation_list['zone_level']).all().values(
                'level_name')[
                0][
                'level_name']

        return data


# class GoodsAcceptanceDetailsSerializer(serializers.ModelSerializer):
#     productName = serializers.CharField(max_length=50, allow_blank=True, source="product_name")
#     productCode = serializers.CharField(max_length=50, allow_blank=True, source="product_code")
#     Quantity = serializers.CharField(max_length=50, allow_blank=True, source="quantity")
#     kitNumber = serializers.CharField(max_length=50, allow_blank=True, source="kit_number")
#     batchNumber = serializers.CharField(max_length=50, allow_blank=True, source="batch_number")
#     serialNumber = serializers.CharField(max_length=50, allow_blank=True, source="serial_number")
#     Validity = serializers.CharField(max_length=50, allow_blank=True, source="validity")
#     Manufacturer = serializers.CharField(max_length=50, allow_blank=True, source="manufacturer")
#     tempInDegree = serializers.CharField(max_length=50, allow_blank=True, source="temp_in_degree")
#     Note = serializers.CharField(max_length=50, allow_blank=True, source="note")
#
#     class Meta:
#         model = models.GoodsAcceptanceDetails
#         fields = [
#             'id',
#             'goods_acceptance',
#             'productName',
#             'productCode',
#             'Quantity',
#             'kitNumber',
#             'batchNumber',
#             'serialNumber',
#             'Validity',
#             'Manufacturer',
#             'tempInDegree',
#             'Note',
#         ]
#
#
# def non_match_elements(list_a, list_b):
#     non_match = []
#     for i in list_a:
#         if i not in list_b:
#             non_match.append(i)
#     return non_match
#
#
# class GoodsAcceptanceSerializer(serializers.ModelSerializer):
#     supplierName = serializers.CharField(max_length=50, allow_blank=True, source="supplier_name")
#     supplierAddress = serializers.CharField(max_length=50, allow_blank=True, source="supplier_address")
#     supplierPhone = serializers.CharField(max_length=50, allow_blank=True, source="supplier_phone")
#     receipentName = serializers.CharField(max_length=50, allow_blank=True, source="receipient_name")
#     receipentAddress = serializers.CharField(max_length=50, allow_blank=True, source="recepient_address")
#     receipentPhone = serializers.CharField(max_length=50, allow_blank=True, source="receipent_phone")
#     Invoice = serializers.CharField(max_length=50, allow_blank=True, source="invoice")
#     invoiceIn = serializers.CharField(max_length=50, allow_blank=True, source="invoice_in")
#     carrierInvoice = serializers.CharField(max_length=50, allow_blank=True, source="carrier_invoice")
#     Awb = serializers.CharField(max_length=50, allow_blank=True, source="awb")
#     Sponser = serializers.CharField(max_length=50, allow_blank=True, source="sponser")
#     Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
#     Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
#     Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
#     Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
#     BoxQuantity = serializers.CharField(max_length=50, allow_blank=True, source="box_quantity")
#     goods_acceptance_list = GoodsAcceptanceDetailsSerializer(many=True)
#
#     class Meta:
#         model = models.GoodsAcceptance
#         fields = [
#             'id',
#             'materialReceipt',
#             'supplierName',
#             'supplierAddress',
#             'supplierPhone',
#             'receipentName',
#             'receipentAddress',
#             'receipentPhone',
#             'Invoice',
#             'invoiceIn',
#             'carrierInvoice',
#             'Awb',
#             'Sponser',
#             'Protocol',
#             'Project',
#             'Weight',
#             'Size',
#             'BoxQuantity',
#             'goods_acceptance_list',
#         ]
#
#     def create(self, validated_data):
#         goods_acceptance_list = validated_data.pop('goods_acceptance_list')
#         # validated_data['enquiry_no'] = generate_lead_enquiry_code()
#         goods = models.GoodsAcceptance.objects.create(**validated_data)
#         for item in goods_acceptance_list:
#             models.GoodsAcceptanceDetails.objects.create(
#                 goods_acceptance=goods, **item)
#
#         return goods
#
#     def update(self, instance, validated_data):
#         validated_data.pop('goods_acceptance_list')
#
#         goods_acceptance_list = self.initial_data['goods_acceptance_list']
#         goods = models.GoodsAcceptance.objects.filter(
#             id=instance.id).update(**validated_data)
#
#         obj = list(models.GoodsAcceptanceDetails.objects.filter(goods_acceptance_id=instance.id).all().values('id'))
#         l = []
#         for i in obj:
#             l.append(i['id'])
#         i = []
#         for item in goods_acceptance_list:
#             i.append(item['id'])
#             if models.GoodsAcceptanceDetails.objects.filter(id=item['id']).exists():
#                 models.GoodsAcceptanceDetails.objects.filter(
#                     id=item['id']).update(goods_acceptance=instance, product_name=item['productName'],
#                                           product_code=item['productCode'],
#                                           quantity=item['Quantity'], kit_number=item['kitNumber'],
#                                           batch_number=item['batchNumber'],
#                                           serial_number=item['serialNumber'], validity=item['Validity'],
#                                           manufacturer=item['Manufacturer'],
#                                           temp_in_degree=item['tempInDegree'], note=item['Note'])
#             else:
#                 models.GoodsAcceptanceDetails.objects.create(goods_acceptance=instance,
#                                                              product_name=item['productName'],
#                                                              product_code=item['productCode'],
#                                                              quantity=item['Quantity'], kit_number=item['kitNumber'],
#                                                              batch_number=item['batchNumber'],
#                                                              serial_number=item['serialNumber'], validity=item['Validity'],
#                                                              manufacturer=item['Manufacturer'],
#                                                              temp_in_degree=item['tempInDegree'], note=item['Note'])
#
#         non_match = non_match_elements(l, i)
#
#         for x in range(len(non_match)):
#             delete = models.GoodsAcceptanceDetails.objects.get(id=non_match[x]).delete()
#
#         return instance

# def to_representation(self, instance):
#     models.ShelfCreation.objects.filter(id=data['id']).all().values('storage_zone', 'zone_level')[0]
#     data['storage_zone'] = \
#         models.StorageZoneCreation.objects.filter(id=shelfcreation_list['storage_zone']).all().values('zone_name')[
#             0][
#             'zone_name']
#     data['level_name'] = \
#         models.ZoneLevelCreationDetails.objects.filter(id=shelfcreation_list['zone_level']).all().values(
#             'level_name')[
#             0][
#             'level_name']
#     return data


class RackToRackTransferDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RackToRackTransferDetails
        fields = [
            'id',
            'RackToRackTransfer',
            'product',
            'kitNumber',
            'batchNumber',
            'serialNumber',
            'quantity',
            'fromRack',
            'fromShelf',
            'toShelf',
            'toRack',
            'fromZone',

        ]


class RackToRackTransferSerializer(serializers.ModelSerializer):
    rack_to_rack_list = RackToRackTransferDetailsSerializer(many=True)

    class Meta:
        model = models.RackToRackTransfer
        fields = [
            'id',
            'document',
            'project',
            'rack_to_rack_list',
        ]

    def create(self, validated_data):
        rack_to_rack_list = validated_data.pop('rack_to_rack_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        Rack_to_Rack_Transfer = models.RackToRackTransfer.objects.create(**validated_data)
        for item in rack_to_rack_list:
            models.RackToRackTransferDetails.objects.create(
                RackToRackTransfer=Rack_to_Rack_Transfer, **item)
            ProductTagging.objects.filter(
                Q(product_id=item['product']) and Q(rack_id=item['fromRack']) and Q(shelf_id=item['fromShelf'])).update(
                product_id=item['product'],
                kit_no=item['kitNumber'],
                batch_no=item['batchNumber'],
                serial_number=item['serialNumber'],
                recevied_qty=item['quantity'],
                rack_id=item['toRack'],
                shelf_id=item['toShelf'],
            )
        return Rack_to_Rack_Transfer

    def update(self, instance, validated_data):
        validated_data.pop('rack_to_rack_list')
        # Comparing and deleting id
        id = list(models.RackToRackTransferDetails.objects.filter(RackToRackTransfer_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []

        rack_to_rack_list = self.initial_data['rack_to_rack_list']
        Rack_to_Rack_Transfer = models.RackToRackTransfer.objects.filter(
            id=instance.id).update(**validated_data)
        for item in rack_to_rack_list:
            list2_id.append(item['id'])
            if models.RackToRackTransferDetails.objects.filter(id=item['id']).exists():
                models.RackToRackTransferDetails.objects.filter(
                    id=item['id']).update(**item)
            else:
                models.RackToRackTransferDetails.objects.create(
                    RackToRackTransfer=instance,
                    product_id=item['product'],
                    fromRack_id=item['fromRack'], fromShelf_id=item['fromShelf'],
                    toShelf_id=item['toShelf'], fromZone_id=item['fromZone'],
                    toRack_id=item['toRack'], kitNumber=item['kitNumber'], batchNumber=item['batchNumber'],
                    quantity=item['quantity'], serialNumber=item['serialNumber']
                )
            ProductTagging.objects.filter(
                Q(product_id=item['product']) and Q(rack_id=item['fromRack']) and Q(shelf_id=item['fromShelf'])).update(
                product_id=item['product'],
                kit_no=item['kitNumber'],
                batch_no=item['batchNumber'],
                serial_number=item['serialNumber'],
                recevied_qty=item['quantity'],
                rack_id=item['toRack'],
                shelf_id=item['toShelf'],
            )
            # Deleting the ID's
        dif = [i for i in list1_id if i not in list2_id]
        models.RackToRackTransferDetails.objects.filter(id__in=dif).delete()

        return instance

    def to_representation(self, instance):
        data = super(RackToRackTransferSerializer,
                     self).to_representation(instance)
        project_list = models.RackToRackTransfer.objects.filter(id=data['id']).all().values('project')[0]
        data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
        ).values('project_name')[0]['project_name']

        return data


class ZoneToZoneTransferDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ZoneToZoneTransferDetails
        fields = [
            'id',
            # 'ZoneToZoneTransfer',
            'product',
            'kitNumber',
            'batchNumber',
            'serialNumber',
            'trc_number',
            'trc_date',
            'expiry_date',
            'manufacturer',
            'min_temp',
            'max_temp',
            'received_qty',
            'available_qty',
            # 'quantity',
        ]

    def to_representation(self, instance):
        data = super(ZoneToZoneTransferDetailsSerializer,
                     self).to_representation(instance)
        Zone_to_Zone_list = \
            models.ZoneToZoneTransferDetails.objects.filter(id=data['id']).all().values('product')[0]
        data['product_id__product_name'] = \
            ProductMaster.objects.filter(id=Zone_to_Zone_list['product']).all().values('product_name')[0]['product_name']
        data['product_id'] = \
            ProductMaster.objects.filter(id=Zone_to_Zone_list['product']).all().values('id')[0][
                'id']

        return data


class ZoneToZoneTransferSerializer(serializers.ModelSerializer):
    zone_to_zone_list = ZoneToZoneTransferDetailsSerializer(many=True)

    class Meta:
        model = models.ZoneToZoneTransfer
        fields = [
            'id',
            'document',
            'transferDate',
            'invoice',
            'wareHouse',
            'fromZone',
            'toZone',
            'zone_to_zone_list',
        ]

    def create(self, validated_data):
        zone_to_zone_list = validated_data.pop('zone_to_zone_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        Zone_to_Zone_Transfer = models.ZoneToZoneTransfer.objects.create(**validated_data)
        for item in zone_to_zone_list:
            models.ZoneToZoneTransferDetails.objects.create(
                ZoneToZoneTransfer=Zone_to_Zone_Transfer, **item)
            if ProductTagging.objects.filter(product=item['product'], ware_house=validated_data['wareHouse'],
                                             zone=validated_data['fromZone']).exists():
                print("hi hi hi")
                ProductTagging.objects.filter(product=item['product'], ware_house=validated_data['wareHouse'],
                                              zone=validated_data['fromZone']).update(
                    product_id=item['product'],
                    # goods_details_id=goods_obj.id,
                    trc_no=item['trc_number'],
                    trc_date=item['trc_date'],
                    kit_no=item['kitNumber'],
                    batch_no=item['batchNumber'],
                    expiry=item['expiry_date'],
                    serial_number=item['serialNumber'],
                    manufacture=item['manufacturer'],
                    min_temp=item['min_temp'],
                    max_temp=item['max_temp'],
                    recevied_qty=item['received_qty'],
                    available_qty=item['available_qty'],
                    ware_house_id=validated_data['wareHouse'],
                    zone_id=validated_data['toZone'],
                    rack_id='',
                    level='',
                    shelf='',
                )
        return Zone_to_Zone_Transfer

    def update(self, instance, validated_data):
        print("check ", validated_data)
        validated_data.pop('zone_to_zone_list')
        zone_to_zone_list = self.initial_data['zone_to_zone_list']
        id = list(models.ZoneToZoneTransferDetails.objects.filter(ZoneToZoneTransfer_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        Rack_to_Rack_Transfer = models.ZoneToZoneTransfer.objects.filter(
            id=instance.id).update(**validated_data)
        for item in zone_to_zone_list:
            list2_id.append(item['id'])
            if models.ZoneToZoneTransferDetails.objects.filter(id=item['id']).exists():
                models.ZoneToZoneTransferDetails.objects.filter(
                    id=item['id']).update(
                    product_id=item['product'],
                    # goods_details_id=goods_obj.id,
                    trc_number=item['trc_number'],
                    trc_date=item['trc_date'],
                    kitNumber=item['kitNumber'],
                    batchNumber=item['batchNumber'],
                    expiry_date=item['expiry_date'],
                    serialNumber=item['serialNumber'],
                    manufacturer=item['manufacturer'],
                    min_temp=item['min_temp'],
                    max_temp=item['max_temp'],
                    received_qty=item['received_qty'],
                    available_qty=item['available_qty'], )

                if ProductTagging.objects.filter(product=item['product'], ware_house=validated_data['wareHouse'],
                                                 zone=validated_data['fromZone']).exists():
                    print("hi hi hi")
                    ProductTagging.objects.filter(product=item['product'], ware_house=validated_data['wareHouse'],
                                                  zone=validated_data['fromZone']).update(
                        product_id=item['product'],
                        # goods_details_id=goods_obj.id,
                        trc_no=item['trc_number'],
                        trc_date=item['trc_date'],
                        kit_no=item['kitNumber'],
                        batch_no=item['batchNumber'],
                        expiry=item['expiry_date'],
                        serial_number=item['serialNumber'],
                        manufacture=item['manufacturer'],
                        min_temp=item['min_temp'],
                        max_temp=item['max_temp'],
                        recevied_qty=item['received_qty'],
                        available_qty=item['available_qty'],
                        ware_house_id=validated_data['wareHouse'],
                        zone_id=validated_data['toZone'],
                        rack_id='',
                        level='',
                        shelf='',
                    )

            else:
                models.ZoneToZoneTransferDetails.objects.create(
                    ZoneToZoneTransfer=instance,
                    product_id=item['product'],
                    # goods_details_id=goods_obj.id,
                    trc_number=item['trc_number'],
                    trc_date=item['trc_date'],
                    kitNumber=item['kitNumber'],
                    batchNumber=item['batchNumber'],
                    expiry_date=item['expiry_date'],
                    serialNumber=item['serialNumber'],
                    manufacturer=item['manufacturer'],
                    min_temp=item['min_temp'],
                    max_temp=item['max_temp'],
                    received_qty=item['received_qty'],
                    available_qty=item['available_qty'], )

        dif = [i for i in list1_id if i not in list2_id]
        models.ZoneToZoneTransferDetails.objects.filter(id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(ZoneToZoneTransferSerializer, self).to_representation(instance)
        producttagging_list = \
            models.ZoneToZoneTransfer.objects.filter(id=data['id']).all().values('wareHouse', 'fromZone',
                                                                                 'toZone', )[0]
        data['wareHouseName'] = \
            WareHouseCreation.objects.filter(id=producttagging_list['wareHouse']).all().values('warehouse_name')[0][
                'warehouse_name']
        data['fromZoneName'] = \
            StorageZoneCreation.objects.filter(id=producttagging_list['fromZone']).all().values('zone_name')[0][
                'zone_name']
        data['toZoneName'] = \
            StorageZoneCreation.objects.filter(id=producttagging_list['toZone']).all().values('zone_name')[0][
                'zone_name']

        return data


class PalletCreationSerializer(serializers.ModelSerializer):
    palletNumber = serializers.CharField(source="pallet_number")
    palletType = serializers.CharField(source="pallet_type")

    class Meta:
        model = models.PalletCreation
        fields = [
            'id',
            'palletNumber',
            'palletType',
        ]


class RefrigerationSerializer(serializers.ModelSerializer):
    refrigeratorNumber = serializers.CharField(source="refrigerator_number")
    refrigeratorType = serializers.CharField(source="refrigerator_type")

    class Meta:
        model = models.Refrigeration
        fields = [
            'id',
            'refrigeratorNumber',
            'refrigeratorType',
        ]


class StorageTypeCreationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StorageTypeCreationDetails
        fields = [
            'id',
            'storage_types',
            'name',
            'code',
            'unitRate',
            'currency',
            'warehouse',
            'zone',
            'rack',
            'level',
            'shelf',
            'minTemp',
            'maxTemp',
            'length',
            'width',
            'height',
            'maxStorage',
            # name: string;

        ]


class StorageTypeCreationSerializer(serializers.ModelSerializer):
    storage_type_creation_list = StorageTypeCreationDetailsSerializer(many=True)
    storageType = serializers.CharField(source="storage_type")

    class Meta:
        model = models.StorageTypeCreation
        fields = [
            'id',
            'storageType',
            'storage_type_creation_list',
        ]

    def create(self, validated_data):
        storage_type_creation_list = validated_data.pop('storage_type_creation_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        storage_types = models.StorageTypeCreation.objects.create(**validated_data)
        for item in storage_type_creation_list:
            print("item", item)
            models.StorageTypeCreationDetails.objects.create(
                storage_types=storage_types, name=item['name'],
                code=item['code'], unitRate=item['unitRate'],
                currency=item['currency'], warehouse=item['warehouse'],
                zone=item['zone'], rack=item['rack'],
                level=item['level'], shelf=item['shelf'],
                minTemp=item['minTemp'], maxTemp=item['maxTemp'],
                length=item['length'], width=item['width'],
                height=item['height'], maxStorage=item['maxStorage'])
        storage_types.save()
        return storage_types

    def update(self, instance, validated_data):
        validated_data.pop('storage_type_creation_list')
        # Comparing and deleting id
        storage_type_creation_list = self.initial_data['storage_type_creation_list']
        Rack_to_Rack_Transfer = models.StorageTypeCreation.objects.filter(
            id=instance.id).update(**validated_data)
        for item in storage_type_creation_list:
            # list2_id.append(item['id'])
            if models.StorageTypeCreationDetails.objects.filter(id=item['id']).exists():
                models.StorageTypeCreationDetails.objects.filter(
                    id=item['id']).update(storage_types=item['storage_types'], name=item['name'],
                                          code=item['code'], unitRate=item['unitRate'],
                                          currency=item['currency'], warehouse_id=item['warehouse'],
                                          zone_id=item['zone'], rack_id=item['rack'],
                                          level_id=item['level'], shelf_id=item['shelf'],
                                          minTemp=item['minTemp'], maxTemp=item['maxTemp'],
                                          length=item['length'], width=item['width'],
                                          height=item['height'], maxStorage=item['maxStorage'])
            else:
                models.StorageTypeCreationDetails.objects.create(
                    storage_types=instance, name=item['name'],
                    code=item['code'], unitRate=item['unitRate'],
                    currency=item['currency'], warehouse_id=item['warehouse'],
                    zone_id=item['zone'], rack_id=item['rack'],
                    level_id=item['level'], shelf_id=item['shelf'],
                    minTemp=item['minTemp'], maxTemp=item['maxTemp'],
                    length=item['length'], width=item['width'],
                    height=item['height'], maxStorage=item['maxStorage'])

        return instance
