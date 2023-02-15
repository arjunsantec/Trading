from rest_framework import serializers
from . import models
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel

from apps.masters.models import PartyMaster
from apps.utils.number_constuctor import NumberConstructor
from apps.utils.constants import NumberConstructorConstants


class InvoiceCreationDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InvoiceCreationDetails
        fields = [
            'id',
            'invoice_creation',
            'description',
            'expiry_date',
            'batch',
            'quantity',
            'country_of_origin',
            'tariff_no',
            'value_per_unit',
            'sub_total',
        ]


class InvoiceCreationSerializer(serializers.ModelSerializer):
    # importerOfRecord = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(),
    #                                                       source='importer_of_record')
    importerOfRecord = serializers.CharField(max_length=100, allow_blank=True, source="importer_of_record")
    customsBroker = serializers.PrimaryKeyRelatedField(queryset=PartyMaster.objects.all(), source='customs_broker')
    invoiceDate = serializers.CharField(max_length=100, allow_blank=True, source="invoice_date")
    shipmentsContains = serializers.CharField(max_length=100, allow_blank=True, source="shipments_contains")
    totalQuantity = serializers.CharField(max_length=100, allow_blank=True, source="total_quantity")
    subTotal = serializers.CharField(max_length=100, allow_blank=True, source="sub_total")
    countryOfOrigin = serializers.CharField(max_length=1000, allow_blank=True, source="country_of_origin")
    dispatchDate = serializers.CharField(max_length=100, allow_blank=True, source="dispatch_date")
    deliveryDate = serializers.CharField(max_length=100, allow_blank=True, source="delivery_date")
    netWeight = serializers.CharField(max_length=100, allow_blank=True, source="net_weight")
    grossWeight = serializers.CharField(max_length=100, allow_blank=True, source="gross_weight")

    invoice_creation_list = InvoiceCreationDetailsSerializer(many=True)

    class Meta:
        model = models.InvoiceCreation
        fields = [
            'id',
            'consignee',
            'importerOfRecord',
            'customsBroker',
            'invoice',
            'invoiceDate',
            'initial',
            'protocol',
            'incoterms',
            'shipmentsContains',
            'totalQuantity',
            'subTotal',
            'countryOfOrigin',
            'manufacturer',
            'carrier',
            'service',
            'hawb',
            'dispatchDate',
            'deliveryDate',
            'consignment',
            'marks',
            'quantity',
            'netWeight',
            'grossWeight',
            'dimension',
            'invoice_creation_list',
            'note',
            'exporter',
        ]

    def create(self, validated_data):
        invoice_creation_list = validated_data.pop('invoice_creation_list')
        validated_data['invoice'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                               INVOICE_NUMBERING, False)
        invoice_creation = models.InvoiceCreation.objects.create(**validated_data)
        for item in invoice_creation_list:
            models.InvoiceCreationDetails.objects.create(
                invoice_creation=invoice_creation, **item)

        return invoice_creation

    def update(self, instance, validated_data):
        validated_data.pop('invoice_creation_list')
        invoice_creation_list = self.initial_data['invoice_creation_list']
        enquiry = models.InvoiceCreation.objects.filter(id=instance.id).update(**validated_data)
        id = list(models.InvoiceCreationDetails.objects.filter(invoice_creation_id=instance.id).all().values('id'))
        list1_id = [i['id'] for i in id]
        list2_id = []
        for item in invoice_creation_list:
            list2_id.append(item['id'])
            if models.InvoiceCreationDetails.objects.filter(id=item['id']).exists():
                models.InvoiceCreationDetails.objects.filter(
                    id=item['id']).update(
                    invoice_creation_id=item['invoice_creation'],
                    description=item['description'],
                    expiry_date=item['expiry_date'],
                    batch=item['batch'],
                    quantity=item['quantity'],
                    country_of_origin=item['country_of_origin'],
                    tariff_no=item['tariff_no'],
                    value_per_unit=item['value_per_unit'],
                    sub_total=item['sub_total']
                )
            else:
                models.InvoiceCreationDetails.objects.create(
                    invoice_creation=instance,
                    description=item['description'],
                    expiry_date=item['expiry_date'],
                    batch=item['batch'],
                    quantity=item['quantity'],
                    country_of_origin=item['country_of_origin'],
                    tariff_no=item['tariff_no'],
                    value_per_unit=item['value_per_unit'],
                    sub_total=item['sub_total']
                )
        dif = [i for i in list1_id if i not in list2_id]
        models.InvoiceCreationDetails.objects.filter(id__in=dif).delete()

        return instance

    def to_representation(self, instance):
        data = super(InvoiceCreationSerializer, self).to_representation(instance)
        invoice_list = models.InvoiceCreation.objects.filter(id=data['id']).all().values('consignee',
                                                                                         'importer_of_record',
                                                                                         'customs_broker')[0]
        # print(invoice_list)
        # if invoice_list['consignee'] is not None:
        #     data['consigneeName'] = PartyMaster.objects.filter(id=invoice_list['consignee']).all().values(
        #         'party_name')[0]['party_name']
        # if invoice_list['importer_of_record'] is not None:
        #     data['importerOfRecordName'] = PartyMaster.objects.filter(id=invoice_list['importer_of_record']).all(
        #         ).values('party_name')[0]['party_name']
        if invoice_list['customs_broker'] is not None:
            data['customsBrokerName'] = PartyMaster.objects.filter(id=invoice_list['customs_broker']).all().values(
                'party_name')[0]['party_name']
            data['customsBrokerAddress'] = PartyMaster.objects.filter(id=invoice_list['customs_broker']).all().values(
                'POC')[0]['POC']
            # print('address', data['customsBrokerAddress'])

        return data




