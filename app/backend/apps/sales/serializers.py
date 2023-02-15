import json

from rest_framework import serializers
from . import models
from apps.utils.number_constuctor import NumberConstructor
from apps.utils.constants import NumberConstructorConstants
from apps.masters.models import ProductMaster
from apps.masters.models import PartyMaster
from drf_writable_nested.serializers import WritableNestedModelSerializer
import ast

def non_match_elements(list_a, list_b):
    non_match = []
    for i in list_a:
        if i not in list_b:
            non_match.append(i)
    return non_match


class ContractReviewSerializer(serializers.ModelSerializer):
    contractReviewNo = serializers.CharField(max_length=150, allow_blank=True,source="contract_review_no")
    reviewDetails = serializers.CharField(max_length=4000,allow_blank=True,source="review_details")
    reviewStatus = serializers.CharField(max_length=250,allow_blank=True,source="review_status")
    approvalDate = serializers.CharField(max_length=50,allow_blank=True,source="approval_date")
    approvalBy = serializers.CharField(max_length=50,allow_blank=True,source="approval_by")
    approvalStatus = serializers.CharField(max_length=50,allow_blank=True,source="approval_status")
    isActive = serializers.CharField(max_length=50,allow_blank=True,source="is_active")

    class Meta:
        model = models.ContractReview
        fields = [
            "id",
            "company",
            "contractReviewNo",
            "date",
            "cr_type",
            # "feasibility_review",
            "customer",
            "reviewDetails",
            "reviewStatus",
            "remarks",
            "approvalDate",
            "approvalBy",
            'approvalStatus',
            "isActive",
        ]

    def create(self, validated_data):

        contract_review_obj = super().create(validated_data)
        contract_review_obj.contract_review_no = NumberConstructor().generate_next_sequence(NumberConstructorConstants.CONTRACT_REVIEW_NUMBERING,False)
        contract_review_obj.save()

        return contract_review_obj


class OrderAcceptanceSerializer(serializers.ModelSerializer):

    contractReview = serializers.CharField(max_length=50,allow_blank=True,source="contract_review")
    customerPoNoDate = serializers.CharField(max_length=50,allow_blank=True,source="customer_po_no_date")
    totalValue = serializers.DecimalField(max_digits=10, decimal_places=2, default=0,source='total_value')
    termsOfPayment = serializers.CharField(max_length=1000,allow_blank=True,source="terms_of_payment")
    bankerName = serializers.CharField(max_length=500,allow_blank=True,source="banker_name")
    branchDetails = serializers.CharField(max_length=500,allow_blank=True,source="branch_details")
    approvalDate = serializers.CharField(max_length=50,allow_blank=True,source="approval_date")
    approvalBy = serializers.CharField(max_length=50,allow_blank=True,source="approval_by")
    approvalStatus = serializers.CharField(max_length=50,allow_blank=True,source="approval_status")
    isActive = serializers.CharField(max_length=50,allow_blank=True,source="is_active")
    class Meta:
        model = models.OrderAcceptance
        fields = [
            "id",
            "company",
            "oa_date",
            "oa_number",
            "contractReview",
            "customer",
            "customerPoNoDate",
            "totalValue",
            "For",
            "destination",
            "tax",
            "frieght",
            "dispatch",
            "termsOfPayment",
            "documents",
            "bankerName",
            "branchDetails",
            "account",
            "approvalDate",
            "approvalBy",
            'approvalStatus',
            "isActive",
             
        ]

    def create(self, validated_data):

        oa_obj = super().create(validated_data)
        oa_obj.oa_number = NumberConstructor().generate_next_sequence(NumberConstructorConstants.ORDER_ACCEPTANCE_NUMBERING,False)
        oa_obj.save()

        return oa_obj
class OrderAcceptanceDetailsSerializer(serializers.ModelSerializer):

    productCode = serializers.CharField(max_length=50,allow_blank=True,source="product_code")
    productName = serializers.CharField(max_length=50,allow_blank=True,source="product_name")
    taxAmount = serializers.CharField(max_length=50,allow_blank=True,source="tax_amount")
    totalAmount = serializers.DecimalField(max_digits=10, decimal_places=2, default=0,source="total_amount")
    pfAmount = serializers.DecimalField(max_digits=10, decimal_places=2, default=0,source="pf_amount")
    unitPrice = serializers.DecimalField(max_digits=10, decimal_places=2, default=0,source="unit_price")

    class Meta:
        model = models.OrderAcceptanceDetails
        fields = [
            "id",
            "oa",
            "product",
            "productCode",
            "productName",
            "description",
            "qty",
            "date",
            "qty",
            "unitPrice",
            "discount",
            "pfAmount",
            "frieght",
            "unit",
            "tax",
            "taxAmount",
            "totalAmount",
        ]


class ProjectCreationDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProjectCreationDetails
        fields = [
            'id',
            'project_creation',
            'product',
            'batch_no',
            'expiry_date',
            'quantity',
            'hs_code',
            'net_weight',
            'unit_value',
            'total_value',
            'currency_type',
        ]


class ProjectCreationFileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProjectCreationFileUpload
        fields = ['id', 'project_creation', 'file']


class ProjectCreationSerializer(serializers.ModelSerializer):
    projectName = serializers.CharField(source='project_name', allow_blank=True)
    projectCode = serializers.CharField(source='project_code', allow_blank=True)
    createdDate = serializers.CharField(source='created_date', allow_blank=True)
    loadingDate = serializers.CharField(source='loading_date', allow_blank=True)
    shipmentDate = serializers.CharField(source='shipment_date', allow_blank=True)
    storageDays = serializers.CharField(source='storage_days', allow_blank=True)
    # From
    fromName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='from_name')
    fromAddress = serializers.CharField(source='from_address', allow_blank=True)
    # zipcode = serializers.CharField(source='zipcode', allow_blank=True)
    studyNumber = serializers.CharField(source='study_number', allow_blank=True)
    protocolNumber = serializers.CharField(source='protocol_number', allow_blank=True)
    orderNumber = serializers.CharField(source='order_number', allow_blank=True)
    contactNo = serializers.CharField(source='contact_no', allow_blank=True)
    contactPerson = serializers.CharField(source='contact_person', allow_blank=True)
    invoiceNumber = serializers.CharField(source='invoice_number', allow_blank=True)
    awbNo = serializers.CharField(source='awb_no', allow_blank=True)
    proformaInvoice = serializers.CharField(source='proforma_invoice', allow_blank=True)
    invoiceType = serializers.CharField(source='invoice_type', allow_blank=True)
    # To
    toName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='to_name')
    toAddress = serializers.CharField(source='to_address', allow_blank=True)
    toZipcode = serializers.CharField(source='to_zipcode', allow_blank=True)
    # Shipping Condition
    tempControlled = serializers.BooleanField(source='temp_controlled')
    minTemp = serializers.CharField(source='min_temp', allow_blank=True)
    maxTemp = serializers.CharField(source='max_temp', allow_blank=True)
    # Storage Condition
    ambientControlled = serializers.BooleanField(source='ambient_controlled')
    ambientNote = serializers.CharField(source='ambient_note', allow_blank=True)
    # Document Details
    documentNo = serializers.CharField(source='document_no', allow_blank=True)
    effectiveDate = serializers.CharField(source='effective_date', allow_blank=True)
    sopRelatedTo = serializers.CharField(source='sop_related_to', allow_blank=True)
    # note = serializers.CharField(source='note', allow_blank=True)
    # Approver
    # name = serializers.CharField(source='name', allow_blank=True)
    # title = serializers.CharField(source='title', allow_blank=True)
    # locations = serializers.CharField(source='locations', allow_blank=True)
    # date = serializers.CharField(source='date', allow_blank=True)
    # signature = serializers.CharField(source='signature', allow_blank=True)

    totalQuantity = serializers.CharField(source='total_quantity', allow_blank=True)
    totalWeight = serializers.CharField(source='total_Weight', allow_blank=True)
    grandTotal = serializers.CharField(source='grand_total', allow_blank=True)

    project_creation_list = ProjectCreationDetailsSerializer(many=True,allow_null=True,required=False)
    file_upload = ProjectCreationFileUploadSerializer( many=True, allow_null=True, required=False)

    class Meta:
        model = models.ProjectCreation
        fields = [
            "id",
            "projectName",
            "projectCode",
            "createdDate",
            "loadingDate",
            "shipmentDate",
            "storageDays",
            "fromName",
            "fromAddress",
            "zipcode",
            "studyNumber",
            "protocolNumber",
            "orderNumber",
            "contactNo",
            "contactPerson",
            "email",
            "invoiceNumber",
            "awbNo",
            "proformaInvoice",
            "invoiceType",
            "toName",
            "toAddress",
            "toZipcode",
            "tempControlled",
            "minTemp",
            "maxTemp",
            "ambientControlled",
            "ambientNote",
            "documentNo",
            "effectiveDate",
            "sopRelatedTo",
            "note",
            "name",
            "title",
            "locations",
            "date",
            "signature",
            'project_creation_list',
            'totalQuantity',
            'totalWeight',
            'grandTotal',
            # 'documents',
            'file_upload',

        ]

    def create(self, validated_data):
        # print('create', validated_data)
        # validated_data.pop('project_creation_list')
        # project_creation_obj = super(ProjectCreationSerializer, self).create(validated_data)

        if validated_data['project_code'] == '':
            project_creation_list = ast.literal_eval(self.initial_data['project_creation_list'])
            validated_data['project_code'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.PROJECT_CREATION_NUMBERING, False)
            image_list = self.initial_data.getlist('file_upload')
            project_creation_obj = models.ProjectCreation.objects.create(**validated_data)
        else:
            project_creation_list = ast.literal_eval(self.initial_data['project_creation_list'])
            image_list = self.initial_data.getlist('file_upload')
            project_creation_obj = models.ProjectCreation.objects.create(**validated_data)

        for item in project_creation_list:
            models.ProjectCreationDetails.objects.create(
                project_creation=project_creation_obj,
                product_id=item['product'],
                batch_no=item['batch_no'],
                expiry_date=item['expiry_date'],
                quantity=item['quantity'],
                hs_code=item['hs_code'],
                net_weight=item['net_weight'],
                unit_value=item['unit_value'],
                total_value=item['total_value'],
                currency_type=item['currency_type']
            )
        for item in image_list:
            # print('images', item)
            models.ProjectCreationFileUpload.objects.create(project_creation=project_creation_obj, file=item)
        project_creation_obj.save()
        return project_creation_obj

    def update(self, instance, validated_data):
        project_creation_list = ast.literal_eval(self.initial_data['project_creation_list'])
        image_list = self.initial_data.getlist('file_upload')
        id = list(models.ProjectCreationDetails.objects.filter(project_creation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        enquiry = models.ProjectCreation.objects.filter(
            id=instance.id).update(**validated_data)
        for item in project_creation_list:
            list2_id.append(item['id'])
            if models.ProjectCreationDetails.objects.filter(id=item['id']).exists():
                models.ProjectCreationDetails.objects.filter(
                    id=item['id']).update(
                    project_creation_id=item['project_creation'],
                    product_id=item['product'],
                    batch_no=item['batch_no'],
                    expiry_date=item['expiry_date'],
                    quantity=item['quantity'],
                    hs_code=item['hs_code'],
                    net_weight=item['net_weight'],
                    unit_value=item['unit_value'],
                    total_value=item['total_value'],
                    currency_type=item['currency_type']
                )
            else:
                models.ProjectCreationDetails.objects.create(
                    project_creation=instance,
                    product_id=item['product'],
                    batch_no=item['batch_no'],
                    expiry_date=item['expiry_date'],
                    quantity=item['quantity'],
                    hs_code=item['hs_code'],
                    net_weight=item['net_weight'],
                    unit_value=item['unit_value'],
                    total_value=item['total_value'],
                    currency_type=item['currency_type']
                )
        for item in image_list:
            # print('images', item)
            models.ProjectCreationFileUpload.objects.create(project_creation=instance, file=item)
        dif = [i for i in list1_id if i not in list2_id]
        models.ProjectCreationDetails.objects.filter(id__in=dif).delete()
        return instance

    def validate(self, attrs):
        try:
            obj = models.ProjectCreation.objects.get(project_code=attrs['project_code'])
        except models.ProjectCreation.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['project_code'] + '  already exists')
        return attrs

    def to_representation(self, instance):
        data = super(ProjectCreationSerializer, self).to_representation(instance)
        from_list = models.ProjectCreation.objects.filter(id=data['id']).all().values('from_name')[0]
        data['fromCustomerName'] = PartyMaster.objects.filter(id=from_list['from_name']).all().values('party_name')[0][
            'party_name']
        to_list = models.ProjectCreation.objects.filter(id=data['id']).all().values('to_name')[0]
        data['toCustomerName'] = PartyMaster.objects.filter(id=to_list['to_name']).all().values('party_name')[0][
            'party_name']

        return data


class ProformaKitCreationDetailsSerializer(serializers.ModelSerializer):
    # shelf_creation = serializers.CharField(max_length=50, allow_blank=True, source="shelf_creation")
    productCode = serializers.CharField(max_length=50, allow_blank=True, source="product_code")
    unitPrice = serializers.CharField(max_length=50, allow_blank=True, source="unit_price")

    class Meta:
        model = models.ProformaKitCreationDetails
        fields = [
            'id',
            'ProformaKitCreation',
            'product',
            'productCode',
            'unit',
            'unitPrice',
            'price'
        ]


class ProformaKitCreationSerializer(serializers.ModelSerializer):
    # zoneLevel = serializers.CharField(max_length=50, allow_blank=True, source="zone_level")
    kitName = serializers.CharField(max_length=50, allow_blank=True, source='kit_name')
    kitQTY = serializers.CharField(max_length=50, allow_blank=True,
                                   source='kit_qty')
    kitValue = serializers.CharField(max_length=50, allow_blank=True,
                                     source='kit_value')
    totalUnits = serializers.CharField(max_length=50, allow_blank=True,
                                   source='total_units')
    totalPrice = serializers.CharField(max_length=50, allow_blank=True,
                                     source='total_price')
    productList = ProformaKitCreationDetailsSerializer(many=True)

    class Meta:
        model = models.ProformaKitCreation
        fields = [
            'id',
            'project',
            'kitName',
            'kitQTY',
            'kitValue',
            'productList',
            'totalUnits',
            'totalPrice'
        ]

    def create(self, validated_data):
        # print(self.initial_data)
        validated_data.pop('productList')
        productList = self.initial_data.pop('productList')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        kit_creation = models.ProformaKitCreation.objects.create(**validated_data)
        for item in productList:
            models.ProformaKitCreationDetails.objects.create(
                ProformaKitCreation=kit_creation,
                product_id=item['product'],
                product_code=item['productCode'],
                unit=item['unit'],
                unit_price=item['unitPrice'],
                price=item['price']
            )
        return kit_creation

    def update(self, instance, validated_data):
        validated_data.pop('productList')
        id = list(models.ProformaKitCreationDetails.objects.filter(ProformaKitCreation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        productList = self.initial_data['productList']
        ProformaKitCreation = models.ProformaKitCreation.objects.filter(
            id=instance.id).update(**validated_data)
        for item in productList:
            list2_id.append(item['id'])
            if models.ProformaKitCreationDetails.objects.filter(id=item['id']).exists():
                models.ProformaKitCreationDetails.objects.filter(
                    id=item['id']).update(
                    ProformaKitCreation_id=item['ProformaKitCreation'],
                    product_id=item['product'],
                    product_code=item['productCode'],
                    unit_price=item['unitPrice'],
                    unit=item['unit'],
                    price=item['price']
                )
            else:
                models.ProformaKitCreationDetails.objects.create(
                    ProformaKitCreation=instance,
                    product_id=item['product'],
                    product_code=item['productCode'],
                    unit_price=item['unitPrice'],
                    unit=item['unit'],
                    price=item['price']
                )
        dif = [i for i in list1_id if i not in list2_id]
        models.ProformaKitCreationDetails.objects.filter(id__in=dif).delete()
        return instance

    def to_representation(self, instance):
        data = super(ProformaKitCreationSerializer, self).to_representation(instance)
        kit_list = models.ProformaKitCreation.objects.filter(id=data['id']).all().values('project')[0]
        data['projectName'] = models.ProjectCreation.objects.filter(id=kit_list['project']).all().values('project_name')[0][
            'project_name']

        return data


class CMTRFCreationDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CMTRFCreationDetails
        fields = [
            'id',
            'cmtrf_creation',
            'item',
            'quantity',
            'product',
            'expiry_date',
            'kit_no',
        ]


class CMTRFAcknowledgementSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CMTRFAcknowledgementDetails
        fields = [
            'id',
            'cmtrf_creation',
            'container',
            'data_logger',
            'alarm',
        ]


class CMTRFCreationSerializer(serializers.ModelSerializer):
    orderNumber = serializers.CharField(max_length=100, allow_blank=True, source="order_no")
    batchNumber = serializers.CharField(max_length=100, allow_blank=True, source="batch_no")
    receiverName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), allow_null=True,
                                                      source='receiver_name')
    cmtrf_list = CMTRFCreationDetailsSerializer(many=True)
    acknowledgement_list = CMTRFAcknowledgementSerializer(many=True)

    class Meta:
        model = models.CMTRFCreation
        fields = [
            'id',
            'protocol',
            'depot',
            'orderNumber',
            'batchNumber',
            'receiverName',
            'cmtrf_list',
            'acknowledgement_list',
        ]

    def create(self, validated_data):
        cmtrf_list = validated_data.pop('cmtrf_list')
        acknowledgement_list = validated_data.pop('acknowledgement_list')
        cmtrf_creation = models.CMTRFCreation.objects.create(**validated_data)
        for item in cmtrf_list:
            models.CMTRFCreationDetails.objects.create(
                cmtrf_creation=cmtrf_creation, **item)
        for item in acknowledgement_list:
            models.CMTRFAcknowledgementDetails.objects.create(
                cmtrf_creation=cmtrf_creation, **item)

        return cmtrf_creation

    def update(self, instance, validated_data):
        validated_data.pop('cmtrf_list')
        validated_data.pop('acknowledgement_list')
        cmtrf_list = self.initial_data['cmtrf_list']
        acknowledgement_list = self.initial_data['acknowledgement_list']
        # print('acknowledge', acknowledgement_list)
        # print('validated data', validated_data)
        enquiry = models.CMTRFCreation.objects.filter(id=instance.id).update(**validated_data)
        id = list(models.CMTRFCreationDetails.objects.filter(cmtrf_creation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        id1 = list(models.CMTRFAcknowledgementDetails.objects.filter(cmtrf_creation_id=instance.id).all().values('id'))
        list1_id1 = [i['id'] for i in id1]
        list2_id1 = []
        for item in cmtrf_list:
            list2_id.append(item['id'])
            if models.CMTRFCreationDetails.objects.filter(id=item['id']).exists():
                models.CMTRFCreationDetails.objects.filter(
                    id=item['id']).update(
                    cmtrf_creation_id=item['cmtrf_creation'],
                    item=item['item'],
                    quantity=item['quantity'],
                    product=item['product'],
                    expiry_date=item['expiry_date'],
                    kit_no=item['kit_no'],
                )
            else:
                models.CMTRFCreationDetails.objects.create(
                    cmtrf_creation=instance,
                    item=item['item'],
                    quantity=item['quantity'],
                    product=item['product'],
                    expiry_date=item['expiry_date'],
                    kit_no=item['kit_no'],
                )
        for item in acknowledgement_list:
            list2_id1.append(item['id'])
            # print('boolean', item)
            if models.CMTRFAcknowledgementDetails.objects.filter(id=item['id']).exists():
                models.CMTRFAcknowledgementDetails.objects.filter(id=item['id']).update(**item)
            else:
                models.CMTRFAcknowledgementDetails.objects.create(cmtrf_creation=instance, **item)
        dif = [i for i in list1_id if i not in list2_id]
        dif1 = [i for i in list1_id1 if i not in list2_id1]
        models.CMTRFCreationDetails.objects.filter(id__in=dif).delete()
        models.CMTRFAcknowledgementDetails.objects.filter(id__in=dif1).delete()

        return instance

