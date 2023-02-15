import ast

# from pandas import array
from rest_framework import serializers
from . import models
from apps.utils.number_constuctor import NumberConstructor
from apps.utils.constants import NumberConstructorConstants
from apps.masters.models import ProductMaster
# from apps.masters.models import PartyMaster
from apps.company.models import Company
from apps.sales.models import ProjectCreation
from ..masters.models import PartyMaster
from apps.wareshouse.models import WareHouseCreation


def non_match_elements(list_a, list_b):
    non_match = []
    for i in list_a:
        if i not in list_b:
            non_match.append(i)
    return non_match


class StudyMaterialReturnDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterialReturnDetails
        fields = [
            'id',
            'study_material_return',
            'study_product',
            'product_code',
            'kit_number',
            'batch_no',
            'serial_no',
            'quantity',
            'type',
            'date',
            'comment',
        ]

    def to_representation(self, instance):
        data = super(StudyMaterialReturnDetailsSerializer, self).to_representation(instance)
        study_list = models.StudyMaterialReturnDetails.objects.filter(id=data['id']).all().values('study_product')[0]
        # print('SMRD', study_list)
        data['productName'] = \
            ProductMaster.objects.filter(id=study_list['study_product']).all().values('product_name')[0][
                'product_name']

        return data


class StudyMaterialReturnSerializer(serializers.ModelSerializer):
    supplierName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='supplier_name')
    supplierAddress = serializers.CharField(max_length=500, allow_blank=True, source="supplier_address")
    supplierPhone = serializers.CharField(max_length=50, allow_blank=True, source="supplier_phone")
    recipientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='recipient_name')
    recipientAddress = serializers.CharField(max_length=500, allow_blank=True, source="recipient_address")
    recipientPhone = serializers.CharField(max_length=50, allow_blank=True, source="recipient_phone")
    Invoice = serializers.CharField(max_length=50, allow_blank=True, source="invoice")
    numberOfPlace = serializers.CharField(max_length=50, allow_blank=True, source="number_of_place")
    # Sponser = serializers.CharField(max_length=50, allow_blank=True, source="sponser")
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    Courier = serializers.CharField(max_length=50, allow_blank=True, source="courier")
    # Recipient = serializers.CharField(max_length=50, allow_blank=True, source="recipient")
    pickUpDate = serializers.CharField(max_length=50, allow_blank=True, source="pickup_date")
    incomeDate = serializers.CharField(max_length=50, allow_blank=True, source="income_date")
    # pickUpTime = serializers.CharField(max_length=50, allow_blank=True, source="pickup_time")
    # incomeTime = serializers.CharField(max_length=50, allow_blank=True, source="income_time")

    study_material_return_list = StudyMaterialReturnDetailsSerializer(many=True)

    class Meta:
        model = models.StudyMaterialReturn
        fields = [
            'id',
            'supplierName',
            'supplierAddress',
            'supplierPhone',
            'recipientName',
            'recipientAddress',
            'recipientPhone',
            'Invoice',
            'numberOfPlace',
            'sponsor',
            'Weight',
            'Size',
            'project',
            'Protocol',
            'Courier',
            # 'Recipient',
            'pickUpDate',
            'incomeDate',
            # 'pickUpTime',
            # 'incomeTime',
            'study_material_return_list',
        ]

    def create(self, validated_data):
        study_material_return_list = validated_data.pop('study_material_return_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        study_return = models.StudyMaterialReturn.objects.create(**validated_data)
        for item in study_material_return_list:
            models.StudyMaterialReturnDetails.objects.create(
                study_material_return=study_return, **item)

        return study_return

    def update(self, instance, validated_data):
        validated_data.pop('study_material_return_list')

        study_material_return_list = self.initial_data['study_material_return_list']
        enquiry = models.StudyMaterialReturn.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.StudyMaterialReturnDetails.objects.filter(study_material_return_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in study_material_return_list:
            i.append(item['id'])
            if models.StudyMaterialReturnDetails.objects.filter(id=item['id']).exists():
                models.StudyMaterialReturnDetails.objects.filter(
                    id=item['id']).update(
                    study_material_return_id=item['study_material_return'],
                    study_product_id=item['study_product'],
                    product_code=item['product_code'], kit_number=item['kit_number'],
                    batch_no=item['batch_no'], serial_no=item['serial_no'],
                    quantity=item['quantity'], type=item['type'],
                    date=item['date'], comment=item['comment'])
            else:
                models.StudyMaterialReturnDetails.objects.create(
                    study_material_return=instance,
                    study_product_id=item['study_product'],
                    product_code=item['product_code'], kit_number=item['kit_number'],
                    batch_no=item['batch_no'], serial_no=item['serial_no'],
                    quantity=item['quantity'], type=item['type'],
                    date=item['date'], comment=item['comment'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.StudyMaterialReturnDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(StudyMaterialReturnSerializer, self).to_representation(instance)
        return_list = models.StudyMaterialReturn.objects.filter(id=data['id']).all().values('supplier_name', 'project', 'sponsor')[0]
        # print("check party name", return_list['supplier_name'])
        data['supplier'] = \
            PartyMaster.objects.filter(id=return_list['supplier_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.StudyMaterialReturn.objects.filter(id=data['id']).all().values('recipient_name')[0]
        # print("check party name", return_lists['recipient_name'])
        data['recipient'] = \
            PartyMaster.objects.filter(id=return_lists['recipient_name']).all().values('party_name')[0][
                'party_name']
        if return_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=return_list['project']).all(
            ).values('project_name')[0]['project_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = PartyMaster.objects.filter(id=return_list['sponsor']).all().values('party_name')[0][
                'party_name']

        return data


class StudyMaterialDestructionDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterialDestructionDetails
        fields = [
            'id',
            'study_material_destruction',
            'destruction_product',
            'product_code',
            'kit_number',
            'batch_no',
            'serial_no',
            'quantity',
            'temp',
            'expiry_date',
            'note',
        ]

    def to_representation(self, instance):
        data = super(StudyMaterialDestructionDetailsSerializer, self).to_representation(instance)
        # print("check data", data)
        Destruction_lists = \
            models.StudyMaterialDestructionDetails.objects.filter(id=data['id']).all().values('destruction_product')[0]

        # print("check product name", Destruction_lists)
        data['productName'] = \
            ProductMaster.objects.filter(id=Destruction_lists['destruction_product']).all().values('product_name')[0][

                'product_name']

        return data


class StudyMaterialDestructionSerializer(serializers.ModelSerializer):
    clientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='client_name')
    clientAddress = serializers.CharField(max_length=500, allow_blank=True, source="client_address")
    clientPhone = serializers.CharField(max_length=50, allow_blank=True, source="client_phone")
    serviceProviderName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(),
                                                             source='service_provider_name')
    serviceProviderAddress = serializers.CharField(max_length=500, allow_blank=True, source="service_provider_address")
    serviceProviderPhone = serializers.CharField(max_length=50, allow_blank=True, source="service_provider_phone")
    Document = serializers.CharField(max_length=50, allow_blank=True, source="document")
    Site = serializers.CharField(max_length=50, allow_blank=True, source="site")
    numberOfPlace = serializers.CharField(max_length=50, allow_blank=True, source="number_of_place")
    # Sponser = serializers.CharField(max_length=50, allow_blank=True, source="sponser")
    fullWeight = serializers.CharField(max_length=50, allow_blank=True, source="full_weight")
    fullSize = serializers.CharField(max_length=50, allow_blank=True, source="full_size")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    testNote = serializers.CharField(max_length=500, allow_blank=True, source="test_note")
    storageLogisticManager = serializers.CharField(max_length=50, allow_blank=True, source="storage_logistic_manager")
    destructionProvider = serializers.CharField(max_length=50, allow_blank=True, source="destruction_provider")
    destructionDate = serializers.CharField(max_length=50, allow_blank=True, source="destruction_date")

    study_material_destruction_list = StudyMaterialDestructionDetailsSerializer(many=True)

    class Meta:
        model = models.StudyMaterialDestruction
        fields = [
            'id',
            'clientName',
            'clientAddress',
            'clientPhone',
            'serviceProviderName',
            'serviceProviderAddress',
            'serviceProviderPhone',
            'Document',
            'Site',
            'numberOfPlace',
            'sponsor',
            'fullWeight',
            'fullSize',
            'project',
            'Protocol',
            'testNote',
            'storageLogisticManager',
            'destructionProvider',
            'destructionDate',
            'study_material_destruction_list',
        ]

    def create(self, validated_data):
        study_material_destruction_list = validated_data.pop('study_material_destruction_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        study_destruction = models.StudyMaterialDestruction.objects.create(**validated_data)
        for item in study_material_destruction_list:
            models.StudyMaterialDestructionDetails.objects.create(
                study_material_destruction=study_destruction, **item)

        return study_destruction

    def update(self, instance, validated_data):
        validated_data.pop('study_material_destruction_list')

        study_material_destruction_list = self.initial_data['study_material_destruction_list']
        enquiry = models.StudyMaterialDestruction.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.StudyMaterialDestructionDetails.objects.filter(
                study_material_destruction_id=instance.id).all().values(
                'id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in study_material_destruction_list:
            i.append(item['id'])
            if models.StudyMaterialDestructionDetails.objects.filter(id=item['id']).exists():
                models.StudyMaterialDestructionDetails.objects.filter(
                    id=item['id']).update(
                    study_material_destruction_id=item['study_material_destruction'],
                    destruction_product_id=item['destruction_product'],
                    product_code=item['product_code'], kit_number=item['kit_number'],
                    batch_no=item['batch_no'], serial_no=item['serial_no'],
                    quantity=item['quantity'], temp=item['temp'],
                    expiry_date=item['expiry_date'], note=item['note'])
            else:
                models.StudyMaterialDestructionDetails.objects.create(
                    study_material_destruction=instance,
                    destruction_product_id=item['destruction_product'],
                    product_code=item['product_code'], kit_number=item['kit_number'],
                    batch_no=item['batch_no'], serial_no=item['serial_no'],
                    quantity=item['quantity'], temp=item['temp'],
                    expiry_date=item['expiry_date'], note=item['note'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.StudyMaterialDestructionDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(StudyMaterialDestructionSerializer, self).to_representation(instance)
        destruction_list = models.StudyMaterialDestruction.objects.filter(id=data['id']).all().values('client_name', 'project', 'sponsor')[0]
        # print("check party name", return_list['supplier_name'])
        data['client'] = \
            PartyMaster.objects.filter(id=destruction_list['client_name']).all().values('party_name')[0][
                'party_name']
        destruction_lists = \
            models.StudyMaterialDestruction.objects.filter(id=data['id']).all().values('service_provider_name')[0]
        # print("check party name", destruction_lists['service_provider_name'])
        data['serviceProvider'] = \
            PartyMaster.objects.filter(id=destruction_lists['service_provider_name']).all().values('party_name')[0][
                'party_name']
        if destruction_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=destruction_list['project']).all(
            ).values('project_name')[0]['project_name']
        if destruction_list['sponsor'] is not None:
            data['sponsorName'] = \
                PartyMaster.objects.filter(id=destruction_list['sponsor']).all().values('party_name')[0][
                    'party_name']

        return data


class StudyMaterialDeliveryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterialDeliveryDetails
        fields = [
            'id',
            'study_material_delivery',
            'study_product',
            'product_code',
            'kit_number',
            'batch_no',
            'serial_no',
            'quantity',
            'validity',
            'temp',
            'receive_date',
            'comment',
        ]

    def to_representation(self, instance):
        data = super(StudyMaterialDeliveryDetailsSerializer, self).to_representation(instance)
        study_list = models.StudyMaterialDeliveryDetails.objects.filter(id=data['id']).all().values('study_product')[0]
        # print('SMRD', study_list)
        data['productName'] = \
            ProductMaster.objects.filter(id=study_list['study_product']).all().values('product_name')[0][
                'product_name']

        return data


class StudyMaterialDeliverySerializer(serializers.ModelSerializer):
    supplierName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='supplier_name')
    supplierAddress = serializers.CharField(max_length=500, allow_blank=True, source="supplier_address")
    supplierPhone = serializers.CharField(max_length=50, allow_blank=True, source="supplier_phone")
    recipientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='recipient_name')
    recipientAddress = serializers.CharField(max_length=500, allow_blank=True, source="recipient_address")
    recipientPhone = serializers.CharField(max_length=50, allow_blank=True, source="recipient_phone")
    Invoice = serializers.CharField(max_length=50, allow_blank=True, source="invoice")
    localInvoice = serializers.CharField(max_length=50, allow_blank=True, source="local_invoice")
    orderNumber = serializers.CharField(max_length=50, allow_blank=True, source="order_number")
    AWB = serializers.CharField(max_length=50, allow_blank=True, source="awb")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponsor")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    # Project = serializers.PrimaryKeyRelatedField(queryset=ProjectCreation.objects.all(),
    #                                              source='project')
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    boxQuantity = serializers.CharField(max_length=50, allow_blank=True, source="box_quantity")
    supplierCourier = serializers.CharField(max_length=50, allow_blank=True, source="supplier_courier")
    recipientCourier = serializers.CharField(max_length=50, allow_blank=True, source="recipient_courier")
    # wareHouse = serializers.CharField(max_length=50, allow_blank=True, source="warehouse")
    # wareHouse = serializers.PrimaryKeyRelatedField(queryset=WareHouseCreation.objects.all(),
    #                                                source='warehouse')
    withdrawalDate = serializers.CharField(max_length=50, allow_blank=True, source="withdrawal_date")
    Verification = serializers.CharField(max_length=50, allow_blank=True, source="verification")
    deliveryDate = serializers.CharField(max_length=50, allow_blank=True, source="delivery_date")

    study_material_delivery_list = StudyMaterialDeliveryDetailsSerializer(many=True)

    class Meta:
        model = models.StudyMaterialDelivery
        fields = [
            'id',
            'supplierName',
            'supplierAddress',
            'supplierPhone',
            'recipientName',
            'recipientAddress',
            'recipientPhone',
            'Invoice',
            'localInvoice',
            'orderNumber',
            'AWB',
            'sponsor',
            'Protocol',
            'project',
            'Weight',
            'Size',
            'boxQuantity',
            'supplierCourier',
            'recipientCourier',
            'warehouse',
            'withdrawalDate',
            'Verification',
            'deliveryDate',
            'study_material_delivery_list',
        ]

    def create(self, validated_data):
        study_material_delivery_list = validated_data.pop('study_material_delivery_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        study_delivery = models.StudyMaterialDelivery.objects.create(**validated_data)
        for item in study_material_delivery_list:
            models.StudyMaterialDeliveryDetails.objects.create(
                study_material_delivery=study_delivery, **item)

        return study_delivery

    def update(self, instance, validated_data):
        validated_data.pop('study_material_delivery_list')

        study_material_delivery_list = self.initial_data['study_material_delivery_list']
        enquiry = models.StudyMaterialDelivery.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.StudyMaterialDeliveryDetails.objects.filter(study_material_delivery_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in study_material_delivery_list:
            i.append(item['id'])
            if models.StudyMaterialDeliveryDetails.objects.filter(id=item['id']).exists():
                models.StudyMaterialDeliveryDetails.objects.filter(
                    id=item['id']).update(
                    study_material_delivery_id=item['study_material_delivery'],
                    study_product_id=item['study_product'],
                    product_code=item['product_code'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    quantity=item['quantity'],
                    validity=item['validity'],
                    temp=item['temp'],
                    receive_date=item['receive_date'],
                    comment=item['comment'])
            else:
                models.StudyMaterialDeliveryDetails.objects.create(
                    study_material_delivery=instance,
                    study_product_id=item['study_product'],
                    product_code=item['product_code'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    quantity=item['quantity'],
                    validity=item['validity'],
                    temp=item['temp'],
                    receive_date=item['receive_date'],
                    comment=item['comment'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.StudyMaterialDeliveryDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(StudyMaterialDeliverySerializer, self).to_representation(instance)
        return_list = models.StudyMaterialDelivery.objects.filter(id=data['id']).all().values('supplier_name', 'sponsor')[0]
        # print("check party name", return_list['supplier_name'])
        data['supplier'] = \
            PartyMaster.objects.filter(id=return_list['supplier_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.StudyMaterialDelivery.objects.filter(id=data['id']).all().values('recipient_name')[0]
        # print("check party name", return_lists['recipient_name'])
        data['recipient'] = \
            PartyMaster.objects.filter(id=return_lists['recipient_name']).all().values('party_name')[0][
                'party_name']
        project_list = models.StudyMaterialDelivery.objects.filter(id=data['id']).all().values('project')[0]
        if project_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
            ).values('project_name')[0]['project_name']
        warehouse_list = models.StudyMaterialDelivery.objects.filter(id=data['id']).all().values('warehouse')[0]
        if warehouse_list['warehouse'] is not None:
            data['WareHouse'] = models.WareHouseCreation.objects.filter(id=warehouse_list['warehouse']).all(
            ).values('warehouse_name')[0]['warehouse_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = PartyMaster.objects.filter(id=return_list['sponsor']).all(
                ).values('party_name')[0]['party_name']

        return data


class DeliverySitePatientDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DeliverySitePatientDetails
        fields = [
            'id',
            'delivery_site_patient',
            'product',
            'product_code',
            'quantity',
            'kit_number',
            'batch_no',
            'serial_no',
            'temp',
            'note',
        ]

    def to_representation(self, instance):
        data = super(DeliverySitePatientDetailsSerializer, self).to_representation(instance)
        study_lists = models.DeliverySitePatientDetails.objects.filter(id=data['id']).all().values('product')[0]
        # print('site to patient', study_lists)
        data['productName'] = \
        ProductMaster.objects.filter(id=study_lists['product']).all().values('product_name')[0]['product_name']

        return data


class DeliverySitePatientSerializer(serializers.ModelSerializer):
    # siteName = serializers.CharField(max_length=50, allow_blank=True, source="site_name")
    siteName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='site_name')
    siteAddress = serializers.CharField(max_length=500, allow_blank=True, source="site_address")
    sitePhone = serializers.CharField(max_length=50, allow_blank=True, source="site_phone")
    # patientName = serializers.CharField(max_length=50, allow_blank=True, source="patient_name")
    patientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='patient_name')
    patientAddress = serializers.CharField(max_length=500, allow_blank=True, source="patient_address")
    patientPhone = serializers.CharField(max_length=50, allow_blank=True, source="patient_phone")
    Document = serializers.CharField(max_length=50, allow_blank=True, source="document")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponsor")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    boxQuantity = serializers.CharField(max_length=50, allow_blank=True, source="box_quantity")
    siteCourier = serializers.CharField(max_length=50, allow_blank=True, source="site_courier")
    patientCourier = serializers.CharField(max_length=50, allow_blank=True, source="patient_courier")
    transferDate = serializers.CharField(max_length=50, allow_blank=True, source="transfer_date")
    deliveryDate = serializers.CharField(max_length=50, allow_blank=True, source="delivery_date")

    delivery_site_patient_list = DeliverySitePatientDetailsSerializer(many=True)

    class Meta:
        model = models.DeliverySitePatient
        fields = [
            'id',
            'siteName',
            'siteAddress',
            'sitePhone',
            'patientName',
            'patientAddress',
            'patientPhone',
            'Document',
            'sponsor',
            'Protocol',
            'project',
            'Weight',
            'Size',
            'boxQuantity',
            'siteCourier',
            'patientCourier',
            'transferDate',
            'deliveryDate',
            'delivery_site_patient_list',
        ]

    def create(self, validated_data):
        delivery_site_patient_list = validated_data.pop('delivery_site_patient_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        delivery = models.DeliverySitePatient.objects.create(**validated_data)
        for item in delivery_site_patient_list:
            models.DeliverySitePatientDetails.objects.create(
                delivery_site_patient=delivery, **item)

        return delivery

    def update(self, instance, validated_data):
        validated_data.pop('delivery_site_patient_list')

        delivery_site_patient_list = self.initial_data['delivery_site_patient_list']
        enquiry = models.DeliverySitePatient.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.DeliverySitePatientDetails.objects.filter(delivery_site_patient_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in delivery_site_patient_list:
            i.append(item['id'])
            if models.DeliverySitePatientDetails.objects.filter(id=item['id']).exists():
                models.DeliverySitePatientDetails.objects.filter(
                    id=item['id']).update(
                    delivery_site_patient_id=item['delivery_site_patient'],
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    temp=item['temp'],
                    note=item['note'])
            else:
                models.DeliverySitePatientDetails.objects.create(
                    delivery_site_patient=instance,
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    temp=item['temp'],
                    note=item['note'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.DeliverySitePatientDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(DeliverySitePatientSerializer, self).to_representation(instance)
        return_list = models.DeliverySitePatient.objects.filter(id=data['id']).all().values('site_name', 'project', 'sponsor')[0]
        # print("check party name", return_list['supplier_name'])
        data['site'] = \
            PartyMaster.objects.filter(id=return_list['site_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.DeliverySitePatient.objects.filter(id=data['id']).all().values('patient_name')[0]
        # print("check party name", return_lists['recipient_name'])
        data['patient'] = \
            PartyMaster.objects.filter(id=return_lists['patient_name']).all().values('party_name')[0][
                'party_name']
        if return_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=return_list['project']).all(
            ).values('project_name')[0]['project_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = PartyMaster.objects.filter(id=return_list['sponsor']).all().values('party_name')[0][
                'party_name']

        return data


class NurseToPatientSerializer(serializers.ModelSerializer):
    # siteName = serializers.CharField(max_length=50, allow_blank=True, source="site_name")
    siteName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='site_name')
    siteAddress = serializers.CharField(max_length=500, allow_blank=True, source="site_address")
    sitePhone = serializers.CharField(max_length=50, allow_blank=True, source="site_phone")
    # patientName = serializers.CharField(max_length=50, allow_blank=True, source="patient_name")
    patientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='patient_name')
    patientAddress = serializers.CharField(max_length=500, allow_blank=True, source="patient_address")
    patientPhone = serializers.CharField(max_length=50, allow_blank=True, source="patient_phone")
    Document = serializers.CharField(max_length=50, allow_blank=True, source="document")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponsor")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Invoice = serializers.CharField(max_length=50, allow_blank=True, source="invoice")

    class Meta:
        model = models.NurseToPatient
        fields = [
            'id',
            'siteName',
            'siteAddress',
            'sitePhone',
            'patientName',
            'patientAddress',
            'patientPhone',
            'Document',
            'sponsor',
            'Protocol',
            'project',
            'Invoice',
        ]

    def to_representation(self, instance):
        data = super(NurseToPatientSerializer, self).to_representation(instance)
        return_list = models.NurseToPatient.objects.filter(id=data['id']).all().values('site_name', 'project', 'sponsor')[0]
        data['site'] = \
            PartyMaster.objects.filter(id=return_list['site_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.NurseToPatient.objects.filter(id=data['id']).all().values('patient_name')[0]
        data['patient'] = \
            PartyMaster.objects.filter(id=return_lists['patient_name']).all().values('party_name')[0][
                'party_name']
        if return_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=return_list['project']).all(
            ).values('project_name')[0]['project_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = \
                PartyMaster.objects.filter(id=return_list['sponsor']).all().values('party_name')[0][
                    'party_name']

        return data


class SiteToSiteDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SiteToSiteDetails
        fields = [
            'id',
            'site_to_site',
            'product',
            'product_code',
            'quantity',
            'kit_number',
            'batch_no',
            'serial_no',
            'temp',
            'note',
        ]

    def to_representation(self, instance):
        data = super(SiteToSiteDetailsSerializer, self).to_representation(instance)
        site_list = models.SiteToSiteDetails.objects.filter(id=data['id']).all().values('product')[0]
        # print('site to site', site_list)
        data['productName'] = ProductMaster.objects.filter(id=site_list['product']).all().values('product_name')[0]['product_name']

        return data


class SiteToSiteSerializer(serializers.ModelSerializer):
    # fromName = serializers.CharField(max_length=50, allow_blank=True, source="from_name")
    fromName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='from_name')
    fromAddress = serializers.CharField(max_length=500, allow_blank=True, source="from_address")
    fromPhone = serializers.CharField(max_length=50, allow_blank=True, source="from_phone")
    # toName = serializers.CharField(max_length=50, allow_blank=True, source="to_name")
    toName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='to_name')
    toAddress = serializers.CharField(max_length=500, allow_blank=True, source="to_address")
    toPhone = serializers.CharField(max_length=50, allow_blank=True, source="to_phone")
    Document = serializers.CharField(max_length=50, allow_blank=True, source="document")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponsor")
    Protocol = serializers.CharField(max_length=50, allow_blank=True, source="protocol")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    boxQuantity = serializers.CharField(max_length=50, allow_blank=True, source="box_quantity")
    fromCourier = serializers.CharField(max_length=50, allow_blank=True, source="from_courier")
    toCourier = serializers.CharField(max_length=50, allow_blank=True, source="to_courier")
    transferDate = serializers.CharField(max_length=50, allow_blank=True, source="transfer_date")
    deliveryDate = serializers.CharField(max_length=50, allow_blank=True, source="delivery_date")

    site_to_site_list = SiteToSiteDetailsSerializer(many=True)

    class Meta:
        model = models.SiteToSite
        fields = [
            'id',
            'fromName',
            'fromAddress',
            'fromPhone',
            'toName',
            'toAddress',
            'toPhone',
            'Document',
            'sponsor',
            'Protocol',
            'project',
            'Weight',
            'Size',
            'boxQuantity',
            'fromCourier',
            'toCourier',
            'transferDate',
            'deliveryDate',
            'site_to_site_list',
        ]

    def create(self, validated_data):
        site_to_site_list = validated_data.pop('site_to_site_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        transfer = models.SiteToSite.objects.create(**validated_data)
        for item in site_to_site_list:
            models.SiteToSiteDetails.objects.create(
                site_to_site=transfer, **item)

        return transfer

    def update(self, instance, validated_data):
        validated_data.pop('site_to_site_list')

        site_to_site_list = self.initial_data['site_to_site_list']
        enquiry = models.SiteToSite.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.SiteToSiteDetails.objects.filter(site_to_site_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in site_to_site_list:
            i.append(item['id'])
            if models.SiteToSiteDetails.objects.filter(id=item['id']).exists():
                models.SiteToSiteDetails.objects.filter(
                    id=item['id']).update(
                    site_to_site_id=item['site_to_site'],
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    temp=item['temp'],
                    note=item['note'])
            else:
                models.SiteToSiteDetails.objects.create(
                    site_to_site=instance,
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    temp=item['temp'],
                    note=item['note'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.SiteToSiteDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(SiteToSiteSerializer, self).to_representation(instance)
        return_list = models.SiteToSite.objects.filter(id=data['id']).all().values('from_name', 'project', 'sponsor')[0]
        # print('from_name', return_list)
        data['fromSiteName'] = \
            PartyMaster.objects.filter(id=return_list['from_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.SiteToSite.objects.filter(id=data['id']).all().values('to_name')[0]
        # print('to_name', return_lists)
        data['toSiteName'] = \
            PartyMaster.objects.filter(id=return_lists['to_name']).all().values('party_name')[0][
                'party_name']
        if return_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=return_list['project']).all(
            ).values('project_name')[0]['project_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = PartyMaster.objects.filter(id=return_list['sponsor']).all().values('party_name')[0][
                'party_name']

        return data


class StudyMaterialExportedDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterialExportedDetails
        fields = [
            'id',
            'study_material_exported',
            'product',
            'product_code',
            'quantity',
            'batch_no',
            'serial_no',
            'validity',
            'temp',
            'export_date',
            'comment',
        ]

    def to_representation(self, instance):
        data = super(StudyMaterialExportedDetailsSerializer, self).to_representation(instance)
        # print('data', data)
        exported_list = models.StudyMaterialExportedDetails.objects.filter(id=data['id']).all().values('product')[0]
        # print('site to patient', exported_list)
        data['productName'] = ProductMaster.objects.filter(id=exported_list['product']).all().values('product_name')[0]['product_name']

        return data


class StudyMaterialExportedSerializer(serializers.ModelSerializer):
    # senderName = serializers.CharField(max_length=50, allow_blank=True, source="sender_name")
    senderName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='sender_name')
    senderAddress = serializers.CharField(max_length=500, allow_blank=True, source="sender_address")
    senderPhone = serializers.CharField(max_length=50, allow_blank=True, source="sender_phone")
    # recipientName = serializers.CharField(max_length=50, allow_blank=True, source="recipient_name")
    recipientName = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='recipient_name')
    recipientAddress = serializers.CharField(max_length=500, allow_blank=True, source="recipient_address")
    recipientPhone = serializers.CharField(max_length=50, allow_blank=True, source="recipient_phone")
    localInvoice = serializers.CharField(max_length=50, allow_blank=True, source="local_invoice")
    AWB = serializers.CharField(max_length=50, allow_blank=True, source="awb")
    # Sponsor = serializers.CharField(max_length=50, allow_blank=True, source="sponsor")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    Weight = serializers.CharField(max_length=50, allow_blank=True, source="weight")
    Size = serializers.CharField(max_length=50, allow_blank=True, source="size")
    Courier = serializers.CharField(max_length=50, allow_blank=True, source="courier")
    # wareHouse = serializers.CharField(max_length=50, allow_blank=True, source="warehouse")
    withdrawalDate = serializers.CharField(max_length=50, allow_blank=True, source="withdrawal_date")
    Verification = serializers.CharField(max_length=50, allow_blank=True, source="verification")

    study_material_exported_list = StudyMaterialExportedDetailsSerializer(many=True)

    class Meta:
        model = models.StudyMaterialExported
        fields = [
            'id',
            'senderName',
            'senderAddress',
            'senderPhone',
            'recipientName',
            'recipientAddress',
            'recipientPhone',
            'localInvoice',
            'AWB',
            'sponsor',
            'project',
            'Weight',
            'Size',
            'Courier',
            'warehouse',
            'withdrawalDate',
            'Verification',
            'study_material_exported_list',
        ]

    def create(self, validated_data):
        study_material_exported_list = validated_data.pop('study_material_exported_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        exported = models.StudyMaterialExported.objects.create(**validated_data)
        for item in study_material_exported_list:
            models.StudyMaterialExportedDetails.objects.create(
                study_material_exported=exported, **item)

        return exported

    def update(self, instance, validated_data):
        validated_data.pop('study_material_exported_list')

        study_material_exported_list = self.initial_data['study_material_exported_list']
        enquiry = models.StudyMaterialExported.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.StudyMaterialExportedDetails.objects.filter(study_material_exported_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in study_material_exported_list:
            i.append(item['id'])
            if models.StudyMaterialExportedDetails.objects.filter(id=item['id']).exists():
                models.StudyMaterialExportedDetails.objects.filter(
                    id=item['id']).update(
                    study_material_exported_id=item['study_material_exported'],
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    validity=item['validity'],
                    temp=item['temp'],
                    export_date=item['export_date'],
                    comment=item['comment'])
            else:
                models.StudyMaterialExportedDetails.objects.create(
                    study_material_exported=instance,
                    product_id=item['product'],
                    product_code=item['product_code'],
                    quantity=item['quantity'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    validity=item['validity'],
                    temp=item['temp'],
                    export_date=item['export_date'],
                    comment=item['comment'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.StudyMaterialExportedDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(StudyMaterialExportedSerializer, self).to_representation(instance)
        return_list = models.StudyMaterialExported.objects.filter(id=data['id']).all().values('sender_name', 'sponsor')[0]
        # print('sender_name', return_list)
        data['sender'] = \
            PartyMaster.objects.filter(id=return_list['sender_name']).all().values('party_name')[0][
                'party_name']
        return_lists = models.StudyMaterialExported.objects.filter(id=data['id']).all().values('recipient_name')[0]
        # print('recipient_name', return_lists)
        data['recipient'] = \
            PartyMaster.objects.filter(id=return_lists['recipient_name']).all().values('party_name')[0][
                'party_name']
        project_list = models.StudyMaterialExported.objects.filter(id=data['id']).all().values('project')[0]
        if project_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
            ).values('project_name')[0]['project_name']
        warehouse_list = models.StudyMaterialExported.objects.filter(id=data['id']).all().values('warehouse')[0]
        if warehouse_list['warehouse'] is not None:
            data['WareHouse'] = models.WareHouseCreation.objects.filter(id=warehouse_list['warehouse']).all(
            ).values('warehouse_name')[0]['warehouse_name']
        if return_list['sponsor'] is not None:
            data['sponsorName'] = PartyMaster.objects.filter(id=return_list['sponsor']).all().values('party_name')[0][
                'party_name']

        return data


class ExpireDateChangeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExpireDateChangeDetails
        fields = [
            'id',
            'expire_date_change',
            'product',
            'product_code',
            'kit_number',
            'batch_no',
            'serial_no',
            'quantity',
            'existent_date',
            'project',
            'updated_date',
            'comment',
        ]

    def to_representation(self, instance):
        data = super(ExpireDateChangeDetailsSerializer, self).to_representation(instance)
        # print('data', data)
        expire_list = models.ExpireDateChangeDetails.objects.filter(id=data['id']).all().values('product')[0]
        # print('expire list', expire_list)
        if expire_list['product'] is not None:
            data['productName'] = ProductMaster.objects.filter(id=expire_list['product']).all().values('product_name')[0]['product_name']

        return data


class ExpireDateChangeSerializer(serializers.ModelSerializer):

    Document = serializers.CharField(max_length=50, allow_blank=True, source="document")
    # Project = serializers.CharField(max_length=50, allow_blank=True, source="project")
    # wareHouse = serializers.CharField(max_length=50, allow_blank=True, source="warehouse")
    movingDate = serializers.CharField(max_length=50, allow_blank=True, source="moving_date")
    Verification = serializers.CharField(max_length=50, allow_blank=True, source="verification")

    expire_date_change_list = ExpireDateChangeDetailsSerializer(many=True)

    class Meta:
        model = models.ExpireDateChange
        fields = [
            'id',
            'Document',
            'project',
            'warehouse',
            'movingDate',
            'Verification',
            'expire_date_change_list',
        ]

    def create(self, validated_data):
        expire_date_change_list = validated_data.pop('expire_date_change_list')
        # validated_data['enquiry_no'] = generate_lead_enquiry_code()
        expire = models.ExpireDateChange.objects.create(**validated_data)
        for item in expire_date_change_list:
            models.ExpireDateChangeDetails.objects.create(
                expire_date_change=expire, **item)

        return expire

    def update(self, instance, validated_data):
        validated_data.pop('expire_date_change_list')

        expire_date_change_list = self.initial_data['expire_date_change_list']
        enquiry = models.ExpireDateChange.objects.filter(
            id=instance.id).update(**validated_data)

        obj = list(
            models.ExpireDateChangeDetails.objects.filter(expire_date_change_id=instance.id).all().values('id'))
        l = []
        for i in obj:
            l.append(i['id'])
        i = []
        for item in expire_date_change_list:
            i.append(item['id'])
            if models.ExpireDateChangeDetails.objects.filter(id=item['id']).exists():
                models.ExpireDateChangeDetails.objects.filter(
                    id=item['id']).update(
                    expire_date_change_id=item['expire_date_change'],
                    product_id=item['product'],
                    product_code=item['product_code'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    quantity=item['quantity'],
                    existent_date=item['existent_date'],
                    project=item['project'],
                    updated_date=item['updated_date'],
                    comment=item['comment'])
            else:
                models.ExpireDateChangeDetails.objects.create(
                    expire_date_change=instance,
                    product_id=item['product'],
                    product_code=item['product_code'],
                    kit_number=item['kit_number'],
                    batch_no=item['batch_no'],
                    serial_no=item['serial_no'],
                    quantity=item['quantity'],
                    existent_date=item['existent_date'],
                    project=item['project'],
                    updated_date=item['updated_date'],
                    comment=item['comment'])

        non_match = non_match_elements(l, i)

        for x in range(len(non_match)):
            delete = models.ExpireDateChangeDetails.objects.get(id=non_match[x]).delete()
        return instance

    def to_representation(self, instance):
        data = super(ExpireDateChangeSerializer, self).to_representation(instance)
        project_list = models.ExpireDateChange.objects.filter(id=data['id']).all().values('project', 'warehouse')[0]
        # print('expiry', data)
        if project_list['project'] is not None:
            data['projectName'] = models.ProjectCreation.objects.filter(id=project_list['project']).all(
            ).values('project_name')[0]['project_name']
        if project_list['warehouse'] is not None:
            # warehouse_list = models.ExpireDateChange.objects.filter(id=data['id']).all().values('warehouse')[0]
            data['WareHouse'] = models.WareHouseCreation.objects.filter(id=project_list['warehouse']).all(
            ).values('warehouse_name')[0]['warehouse_name']

        return data










