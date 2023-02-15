from rest_framework import serializers

from apps.utils.number_constuctor import NumberConstructor

from . import models
from apps.masters.models import ProductMaster
from apps.utils.constants import NumberConstructorConstants

from .models import GRNDetails
from apps.masters.models import ProductMaster, PartyMaster
from apps.company.models import Company
from apps.sales.models import ProjectCreation

from ..wareshouse.models import WareHouseCreation, StorageZoneCreation, ZoneLevelCreation, ZoneLevelCreationDetails, \
    ShelfCreationDetails


class GRNDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GRNDetails
        fields = [
            'id',
            'material_receipt',
            'product_code',
            'product_id',
            'trc_no',
            'trc_date',
            'kit_no',
            'batch_no',
            'expiry',
            'serial_number',
            'manufacture',
            'min_temp',
            'max_temp',
            'recevied_qty',
            'ware_house',
            'zone',
            # 'rack',
            # 'shelf',
            'note',
            'is_flag',

        ]

    def to_representation(self, instance):
        data = super(GRNDetailsSerializer,
                     self).to_representation(instance)
        GRNDetails_list = \
            models.GRNDetails.objects.filter(id=data['id']).all().values('product')[0]
        data['productName'] = \
            ProductMaster.objects.filter(id=GRNDetails_list['product']).all().values('product_name')

        return data


class MaterialReceiptSerializer(serializers.ModelSerializer):
    grn_details = GRNDetailsSerializer(many=True)
    # inwardType = serializers.CharField(source='inward_type')
    poNumber = serializers.CharField(max_length=50, source='po_number', allow_blank=True)
    poDate = serializers.CharField(source='po_date', allow_blank=True)
    supplierInvoiceNumber = serializers.CharField(
        source='supplier_invoice_number', allow_blank=True)
    courierNo = serializers.CharField(source='courier_no', allow_blank=True)
    supplierName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='supplier_name')

    # supplierName = serializers.CharField(source='supplier_name')
    supplierAddress = serializers.CharField(source='supplier_address')
    deliveryChallanNo = serializers.CharField(source='delivery_challan_no', allow_blank=True)
    corgoType = serializers.CharField(source='corgo_type', allow_blank=True)
    boxQty = serializers.CharField(source='box_qty')
    requestApproval = serializers.CharField(source='request_approval')
    approvalOnDeviatior = serializers.CharField(source='approval_on_deviatior')
    recipientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='recipient_name')
    recipientAddress = serializers.CharField(source='recipient_address')
    recipientPhone = serializers.CharField(source='recipient_phone')
    isApproved = serializers.CharField(source='is_approved')
    supplierPhone = serializers.CharField(source='supplier_phone')
    invoiceIn = serializers.CharField(max_length=50, allow_blank=True, source="invoice_in")
    carrierInvoice = serializers.CharField(max_length=50, allow_blank=True, source="carrier_invoice")
    receiveDate = serializers.CharField(source='receive_date')
    orderNumber = serializers.CharField(source='order_number', allow_blank=True)
    studyNumber = serializers.CharField(source='study_number', allow_blank=True)
    incoTerms = serializers.CharField(source='inco_terms', allow_blank=True)
    shippingCondition = serializers.BooleanField(source='shipping_condition')
    storageCondition = serializers.BooleanField(source='storage_condition')

    class Meta:
        model = models.MaterialReceipt
        fields = [
            'id',
            'materialReceiptCode',
            # 'inwardType',
            'poNumber',
            'poDate',
            'supplierInvoiceNumber',
            'courierNo',
            'supplierName',
            'supplierAddress',
            'supplierPhone',
            'deliveryChallanNo',
            'corgoType',
            'boxQty',
            'requestApproval',
            'approvalOnDeviatior',
            'awb',
            'sponsor',
            'portocol',
            'project',
            'weight',
            'size',
            'recipientName',
            'recipientAddress',
            'recipientPhone',
            'isApproved',
            'invoice',
            'invoiceIn',
            'carrierInvoice',
            'receiveDate',
            'courier',
            'grn_details',
            'orderNumber',
            'studyNumber',
            'incoTerms',
            'shippingCondition',
            'storageCondition',
        ]

    def create(self, validated_data):

        validated_data.pop('grn_details')
        grn_details = self.initial_data.pop('grn_details')
        validated_data['materialReceiptCode'] = NumberConstructor().generate_next_sequence(
            NumberConstructorConstants.MATERIAL_RECEIPT_NUMBERING, False)
        material_receipt = models.MaterialReceipt.objects.create(
            **validated_data)

        for item in grn_details:
            item['trc_no'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.TRC_NUMBERING, False)
            grn_obj = models.GRNDetails.objects.create(
                material_receipt=material_receipt,
                product_id=item['product_id'],
                product_code=item['product_code'],
                trc_no=item['trc_no'],
                trc_date=item['trc_date'],
                kit_no=item['kit_no'],
                batch_no=item['batch_no'],
                expiry=item['expiry'],
                serial_number=item['serial_number'],
                manufacture=item['manufacture'],
                min_temp=item['min_temp'],
                max_temp=item['max_temp'],
                recevied_qty=item['recevied_qty'],
                ware_house_id=item['ware_house'],
                zone_id=item['zone'],
                # rack_id=item['rack'],
                # shelf_id=item['shelf'],
                note=item['note'], )

        material_receipt.save()
        return material_receipt

    def update(self, instance, validated_data):
        validated_data.pop('grn_details')
        grn_details = self.initial_data['grn_details']
        material_receipt = models.MaterialReceipt.objects.filter(
            id=instance.id).update(**validated_data)

        # Comparing and deleting id
        id = list(models.GRNDetails.objects.filter(material_receipt_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []

        for item in grn_details:
            if models.GRNDetails.objects.filter(id=item['id']).exists():
                list2_id.append(item['id'])
                models.GRNDetails.objects.filter(
                    id=item['id']).update(product_id=item['product_id'],
                                          product_code=item['product_code'],
                                          trc_no=item['trc_no'],
                                          trc_date=item['trc_date'],
                                          kit_no=item['kit_no'],
                                          batch_no=item['batch_no'],
                                          expiry=item['expiry'],
                                          serial_number=item['serial_number'],
                                          manufacture=item['manufacture'],
                                          min_temp=item['min_temp'],
                                          max_temp=item['max_temp'],
                                          recevied_qty=item['recevied_qty'],
                                          ware_house_id=item['ware_house'],
                                          zone_id=item['zone'],
                                          # rack_id=item['rack'],
                                          # shelf_id=item['shelf'],
                                          note=item['note'],
                                          )


            else:
                item['trc_no'] = NumberConstructor().generate_next_sequence(
                    NumberConstructorConstants.TRC_NUMBERING, False)
                grn_obj = models.GRNDetails.objects.create(
                    material_receipt=instance, product_id=item['product_id'],
                    product_code=item['product_code'],
                    trc_no=item['trc_no'],
                    trc_date=item['trc_date'],
                    kit_no=item['kit_no'],
                    batch_no=item['batch_no'],
                    expiry=item['expiry'],
                    serial_number=item['serial_number'],
                    manufacture=item['manufacture'],
                    min_temp=item['min_temp'],
                    max_temp=item['max_temp'],
                    recevied_qty=item['recevied_qty'],
                    ware_house_id=item['ware_house'],
                    zone_id=item['zone'],
                    # rack_id=item['rack'],
                    # shelf_id=item['shelf'],
                    note=item['note'], )

        # Deleting the ID's
        dif = [i for i in list1_id if i not in list2_id]
        models.GRNDetails.objects.filter(id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(MaterialReceiptSerializer,
                     self).to_representation(instance)
        MaterialReceipt_list = models.MaterialReceipt.objects.filter(id=data['id']).all().values('supplier_name')[0]
        data['supplier'] = \
            models.PartyMaster.objects.filter(id=MaterialReceipt_list['supplier_name']).all().values('party_name')[0][
                'party_name']

        MaterialReceipt_list = models.MaterialReceipt.objects.filter(id=data['id']).all().values('recipient_name', 'sponsor')[0]
        data['recipient'] = \
            models.PartyMaster.objects.filter(id=MaterialReceipt_list['recipient_name']).all().values('party_name')[0][
                'party_name']
        if MaterialReceipt_list['sponsor'] is not None:
            data['sponsorName'] = \
                models.PartyMaster.objects.filter(id=MaterialReceipt_list['sponsor']).all().values('party_name')[0][
                    'party_name']
        project_list = models.MaterialReceipt.objects.filter(id=data['id']).all().values('project')[0]
        data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
        ).values('project_name')[0]['project_name']

        return data


class ProductTaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductTagging
        fields = [
            'id',
            'product',
            # 'inwardType',
            'trc_no',
            'trc_date',
            'kit_no',
            'batch_no',
            'expiry',
            'serial_number',
            'manufacture',
            'min_temp',
            'max_temp',
            'recevied_qty',
            'available_qty',
            'price',
            'ware_house',
            'zone',
            'rack',
            'level',
            'shelf',
            'project',
            'storage_type',
            'type_name',
            'load_date',
            'unload_date',
        ]
        # exclude = ['created', 'modified', 'user_created', 'user_modified', 'guid', ]

    def to_representation(self, instance):
        data = super(ProductTaggingSerializer, self).to_representation(instance)
        producttagging_list = \
            models.ProductTagging.objects.filter(id=data['id']).all().values('product', 'ware_house', 'zone', 'rack',
                                                                             'level', 'shelf', 'project')[0]
        # print('producttagging_list', producttagging_list)
        if producttagging_list['product'] is not None:
            data['productName'] = \
                ProductMaster.objects.filter(id=producttagging_list['product']).all().values('product_name')[0][
                    'product_name']
        if producttagging_list['ware_house'] is not None:
            data['wareHouseName'] = \
                WareHouseCreation.objects.filter(id=producttagging_list['ware_house']).all().values('warehouse_name')[
                    0][
                    'warehouse_name']
        if producttagging_list['zone'] is not None:
            data['zoneName'] = \
                StorageZoneCreation.objects.filter(id=producttagging_list['zone']).all().values('zone_name')[0][
                    'zone_name']

        if producttagging_list['rack'] is not None:
            data['rackName'] = \
                ZoneLevelCreation.objects.filter(id=producttagging_list['rack']).all().values('rack_name')[0][
                    'rack_name']

        if producttagging_list['level'] is not None:
            data['levelName'] = \
                ZoneLevelCreationDetails.objects.filter(id=producttagging_list['level']).all().values('level_name')[0][
                    'level_name']
        if producttagging_list['shelf'] is not None:
            data['shelfName'] = \
                ShelfCreationDetails.objects.filter(id=producttagging_list['shelf']).all().values('shelf_name')[0][
                    'shelf_name']
        if producttagging_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=producttagging_list['project']).all(
            ).values('project_name')[0]['project_name']

        return data


class GoodsAcceptanceDetailsSerializer(serializers.ModelSerializer):
    productCode = serializers.CharField(max_length=50, allow_blank=True, source="product_code")
    Quantity = serializers.CharField(max_length=50, allow_blank=True, source="quantity")
    rejectedQuantity = serializers.CharField(max_length=50, allow_blank=True, source="rejected_quantity")
    acceptedQuantity = serializers.CharField(max_length=50, allow_blank=True, source="accepted_quantity")
    kitNumber = serializers.CharField(max_length=50, allow_blank=True, source="kit_number")
    batchNumber = serializers.CharField(max_length=50, allow_blank=True, source="batch_number")
    serialNumber = serializers.CharField(max_length=50, allow_blank=True, source="serial_number")
    Validity = serializers.CharField(max_length=50, allow_blank=True, source="validity")
    Manufacturer = serializers.CharField(max_length=50, allow_blank=True, source="manufacturer")
    minTemp = serializers.CharField(max_length=50, allow_blank=True, source="min_temp")
    maxTemp = serializers.CharField(max_length=50, allow_blank=True, source="max_temp")
    Note = serializers.CharField(max_length=50, allow_blank=True, source="note")

    class Meta:
        model = models.GoodsAcceptanceDetails
        fields = [
            'id',
            'goods_acceptance',
            # 'productName',
            'product_id',
            'productCode',
            'Quantity',
            'rejectedQuantity',
            'acceptedQuantity',
            'kitNumber',
            'batchNumber',
            'serialNumber',
            'Validity',
            'Manufacturer',
            'minTemp',
            'maxTemp',
            'Note',
            'ware_house',
            'zone',
            # 'rack',
            # 'shelf',
            'trc_no',
            'trc_date',
        ]

    def to_representation(self, instance):
        data = super(GoodsAcceptanceDetailsSerializer,
                     self).to_representation(instance)
        GoodsAcceptanceDetails_list = \
            models.GoodsAcceptanceDetails.objects.filter(id=data['id']).all().values('product')[0]
        # print(GoodsAcceptanceDetails_list)
        data['productName'] = \
            ProductMaster.objects.filter(id=GoodsAcceptanceDetails_list['product']).all().values('product_name')

        return data


class GoodsAcceptanceSerializer(serializers.ModelSerializer):
    supplierName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='supplier_name')

    supplierAddress = serializers.CharField(max_length=50, allow_blank=True, source="supplier_address")
    supplierPhone = serializers.CharField(max_length=50, allow_blank=True, source="supplier_phone")
    recipientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='recipient_name')
    recipientAddress = serializers.CharField(max_length=50, allow_blank=True, source="recepient_address")
    recipientPhone = serializers.CharField(max_length=50, allow_blank=True, source="receipent_phone")
    Invoice = serializers.CharField(max_length=50, allow_blank=True, source="invoice")
    invoiceIn = serializers.CharField(max_length=50, allow_blank=True, source="invoice_in")
    carrierInvoice = serializers.CharField(max_length=50, allow_blank=True, source="carrier_invoice")
    Awb = serializers.CharField(max_length=50, allow_blank=True, source="awb")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponser")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Project = serializers.PrimaryKeyRelatedField(queryset=ProjectCreation.objects.all(), source='project')
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    BoxQuantity = serializers.CharField(max_length=50, allow_blank=True, source="box_quantity")
    goods_acceptance_list = GoodsAcceptanceDetailsSerializer(many=True)
    receiveDate = serializers.CharField(source='receive_date')
    studyNumber = serializers.CharField(allow_blank=True, source='study_number')
    orderNumber = serializers.CharField(allow_blank=True, source='order_number')

    class Meta:
        model = models.GoodsAcceptance
        fields = [
            'id',
            'materialReceipt',
            'supplierName',
            'supplierAddress',
            'supplierPhone',
            'recipientName',
            'recipientAddress',
            'recipientPhone',
            'Invoice',
            'invoiceIn',
            'carrierInvoice',
            'Awb',
            'sponsor',
            'Protocol',
            'Project',
            'Weight',
            'Size',
            'BoxQuantity',
            'goods_acceptance_list',
            'receiveDate',
            'studyNumber',
            'orderNumber',
            'courier',
            'status'
        ]

    def create(self, validated_data):

        validated_data.pop('goods_acceptance_list')
        goods_acceptance_list = self.initial_data.pop('goods_acceptance_list')
        goods = models.GoodsAcceptance.objects.create(**validated_data)
        Material_Receipt_obj = validated_data.pop('materialReceipt')
        material_receipt = models.MaterialReceipt.objects.filter(
            id=Material_Receipt_obj.id).update(is_approved=self.initial_data['status'])
        for item in goods_acceptance_list:
            if item['trc_no'] == "":
                item['trc_no'] = NumberConstructor().generate_next_sequence(
                    NumberConstructorConstants.TRC_NUMBERING, False)
            goods_obj = models.GoodsAcceptanceDetails.objects.create(
                goods_acceptance=goods, product_id=item['product_id'],
                product_code=item['productCode'],
                quantity=item['Quantity'], kit_number=item['kitNumber'],
                batch_number=item['batchNumber'],
                serial_number=item['serialNumber'], validity=item['Validity'],
                manufacturer=item['Manufacturer'],
                min_temp=item['minTemp'],
                max_temp=item['maxTemp'],
                note=item['Note'],
                ware_house_id=item['ware_house'],
                zone_id=item['zone'],
                # rack_id=item['rack'],
                # shelf_id=item['shelf'],
                trc_no=item['trc_no'],
                trc_date=item['trc_date'],
                rejected_quantity=item['rejectedQuantity'],
                accepted_quantity=item['acceptedQuantity'],
            )
            if self.initial_data['status'] == 'APPROVED':
                models.ProductTagging.objects.create(
                    product_id=item['product_id'],
                    goods_details_id=goods_obj.id,
                    trc_no=item['trc_no'],
                    trc_date=item['trc_date'],
                    kit_no=item['kitNumber'],
                    batch_no=item['batchNumber'],
                    expiry=item['Validity'],
                    serial_number=item['serialNumber'],
                    manufacture=item['Manufacturer'],
                    min_temp=item['minTemp'],
                    max_temp=item['maxTemp'],
                    recevied_qty=item['acceptedQuantity'],
                    ware_house_id=item['ware_house'],
                    zone_id=item['zone'],
                    # rack_id=item['rack'],
                    # shelf_id=item['shelf'],
                )

        return goods

    def update(self, instance, validated_data):
        validated_data.pop('goods_acceptance_list')
        goods_acceptance_list = self.initial_data['goods_acceptance_list']
        goods = models.GoodsAcceptance.objects.filter(
            id=instance.id).update(**validated_data)
        Material_Receipt_obj = validated_data.pop('materialReceipt')
        material_receipt = models.MaterialReceipt.objects.filter(
            id=Material_Receipt_obj.id).update(is_approved=self.initial_data['status'])

        # Comparing and deleting id
        id = list(models.GoodsAcceptanceDetails.objects.filter(goods_acceptance_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []

        for item in goods_acceptance_list:
            list2_id.append(item['id'])
            if item['trc_no'] == "":
                item['trc_no'] = NumberConstructor().generate_next_sequence(
                    NumberConstructorConstants.TRC_NUMBERING, False)
            if models.GoodsAcceptanceDetails.objects.filter(id=item['id']).exists():
                goods_obj = models.GoodsAcceptanceDetails.objects.filter(
                    id=item['id']).update(goods_acceptance=instance, product_id=item['product_id'],
                                          product_code=item['productCode'],
                                          quantity=item['Quantity'], kit_number=item['kitNumber'],
                                          batch_number=item['batchNumber'],
                                          serial_number=item['serialNumber'], validity=item['Validity'],
                                          manufacturer=item['Manufacturer'],
                                          min_temp=item['minTemp'],
                                          max_temp=item['maxTemp'],
                                          note=item['Note'],
                                          ware_house_id=item['ware_house'],
                                          zone_id=item['zone'],
                                          # rack_id=item['rack'],
                                          # shelf_id=item['shelf'],
                                          trc_no=item['trc_no'],
                                          trc_date=item['trc_date'],
                                          rejected_quantity=item['rejectedQuantity'],
                                          accepted_quantity=item['acceptedQuantity'],
                                          )
                if self.initial_data['status'] == 'APPROVED':
                    if models.ProductTagging.objects.filter(goods_details_id=item['id']).exists():
                        models.ProductTagging.objects.filter(
                            goods_details_id=item['id']).update(
                            product_id=item['product_id'],
                            trc_no=item['trc_no'],
                            trc_date=item['trc_date'],
                            kit_no=item['kitNumber'],
                            batch_no=item['batchNumber'],
                            expiry=item['Validity'],
                            serial_number=item['serialNumber'],
                            manufacture=item['Manufacturer'],
                            min_temp=item['minTemp'],
                            max_temp=item['maxTemp'],
                            recevied_qty=item['acceptedQuantity'],
                            ware_house_id=item['ware_house'],
                            zone_id=item['zone'],
                            # rack_id=item['rack'],
                            # shelf_id=item['shelf'],
                        )
                    else:
                        models.ProductTagging.objects.create(
                            product_id=item['product_id'],
                            goods_details_id=item['id'],
                            trc_no=item['trc_no'],
                            trc_date=item['trc_date'],
                            kit_no=item['kitNumber'],
                            batch_no=item['batchNumber'],
                            expiry=item['Validity'],
                            serial_number=item['serialNumber'],
                            manufacture=item['Manufacturer'],
                            min_temp=item['minTemp'],
                            max_temp=item['maxTemp'],
                            recevied_qty=item['acceptedQuantity'],
                            ware_house_id=item['ware_house'],
                            zone_id=item['zone'],
                            # rack_id=item['rack'],
                            # shelf_id=item['shelf'],
                        )



            else:
                goods_obj = models.GoodsAcceptanceDetails.objects.create(goods_acceptance=instance,
                                                                         product_id=item['product_id'],
                                                                         product_code=item['productCode'],
                                                                         quantity=item['Quantity'],
                                                                         kit_number=item['kitNumber'],
                                                                         batch_number=item['batchNumber'],
                                                                         serial_number=item['serialNumber'],
                                                                         validity=item['Validity'],
                                                                         manufacturer=item['Manufacturer'],
                                                                         min_temp=item['minTemp'],
                                                                         max_temp=item['maxTemp'],
                                                                         note=item['Note'],
                                                                         ware_house_id=item['ware_house'],
                                                                         zone_id=item['zone'],
                                                                         # rack_id=item['rack'],
                                                                         # shelf_id=item['shelf'],
                                                                         trc_no=item['trc_no'],
                                                                         trc_date=item['trc_date'],
                                                                         rejected_quantity=item['rejectedQuantity'],
                                                                         accepted_quantity=item['acceptedQuantity'],
                                                                         )
                if self.initial_data['status'] == 'APPROVED':
                    models.ProductTagging.objects.create(
                        product_id=item['product_id'],
                        goods_details_id=goods_obj.id,
                        trc_no=item['trc_no'],
                        trc_date=item['trc_date'],
                        kit_no=item['kitNumber'],
                        batch_no=item['batchNumber'],
                        expiry=item['Validity'],
                        serial_number=item['serialNumber'],
                        manufacture=item['Manufacturer'],
                        min_temp=item['minTemp'],
                        max_temp=item['maxTemp'],
                        recevied_qty=item['acceptedQuantity'],
                        ware_house_id=item['ware_house'],
                        zone_id=item['zone'],
                        # rack_id=item['rack'],
                        # shelf_id=item['shelf'],
                    )

        # Deleting the ID's
        dif = [i for i in list1_id if i not in list2_id]
        models.GoodsAcceptanceDetails.objects.filter(id__in=dif).delete()
        models.ProductTagging.objects.filter(goods_details_id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(GoodsAcceptanceSerializer,
                     self).to_representation(instance)
        MaterialReceipt_list = models.GoodsAcceptance.objects.filter(id=data['id']).all().values('supplier_name')[0]
        data['supplier'] = \
            models.PartyMaster.objects.filter(id=MaterialReceipt_list['supplier_name']).all().values('party_name')[0][
                'party_name']
        # # data['company_name']=Company.objects.filter(id=data['supplier']).all().values('company_name')[0]['company_name']

        MaterialReceipt_list = models.GoodsAcceptance.objects.filter(id=data['id']).all().values('recipient_name', 'sponsor')[0]
        data['recipient'] = \
            models.PartyMaster.objects.filter(id=MaterialReceipt_list['recipient_name']).all().values('party_name')[0][
                'party_name']
        if MaterialReceipt_list['sponsor'] is not None:
            data['sponsorName'] = \
                models.PartyMaster.objects.filter(id=MaterialReceipt_list['sponsor']).all().values('party_name')[
                    0]['party_name']
        # # data['company_recipient_name']=Company.objects.filter(id=data['recipient']).all().values('company_name')[0]['company_name']
        project_list = models.GoodsAcceptance.objects.filter(id=data['id']).all().values('project')[0]
        data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
        ).values('project_name')[0]['project_name']

        return data
