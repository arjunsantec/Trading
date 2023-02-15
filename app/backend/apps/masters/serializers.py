from rest_framework import serializers
from . import models
from .models import ProductCategory, ProductSubCategory, UnitMaster
from apps.utils.number_constuctor import NumberConstructor
from apps.utils.constants import NumberConstructorConstants


class PartyMasterSerializer(serializers.ModelSerializer):
    partyName = serializers.CharField(max_length=100, source="party_name")
    companyAddress = serializers.CharField(max_length=250, allow_blank=True, source="company_address")
    partyCode = serializers.CharField(max_length=100, allow_blank=True, source="party_code")
    taxNo = serializers.CharField(max_length=50, allow_blank=True, source="tax_no")
    phoneNumber = serializers.CharField(max_length=50, allow_blank=True, source="phone_number")
    partyType = serializers.CharField(max_length=100, allow_blank=True, source="party_type")
    # orgType = serializers.CharField(max_length=100,allow_blank=True,source="org_type")
    stateCode = serializers.CharField(max_length=250, allow_blank=True, source="state_code")
    countryCode = serializers.CharField(max_length=250, allow_blank=True, source="country_code")
    # billingAddress = serializers.CharField(max_length=4000,default=None ,source="billing_address")
    # bankDetails = serializers.CharField(max_length=4000,default=None, source="bank_details")
    shippingAddress = serializers.CharField(max_length=4000, default=None, source="shipping_address")
    # creditLimit = serializers.DecimalField(max_digits=10,decimal_places=2,source="credit_limit")
    # debitLimit = serializers.DecimalField(max_digits=10,decimal_places=2,source="debit_limit")
    # creditAmount = serializers.DecimalField(max_digits=10,decimal_places=2,source="credit_amount")
    # debitAmount = serializers.DecimalField(max_digits=10,decimal_places=2,source="debit_amount")
    approvalStatus = serializers.CharField(max_length=100, allow_blank=True, source="approval_status")
    approvalBy = serializers.CharField(max_length=100, allow_blank=True, source="approval_by")
    approvalDate = serializers.CharField(max_length=100, allow_blank=True, source="approval_date")
    zipCode = serializers.CharField(max_length=50, allow_blank=True, source="zip_code")

    class Meta:
        model = models.PartyMaster
        fields = [
            'id',
            'partyName',
            'partyCode',
            'taxNo',
            'phoneNumber',
            'partyType',
            # 'orgType',
            'state',
            'country',
            'email',
            'countryCode',
            'stateCode',
            # 'billingAddress',
            'shippingAddress',
            # 'bankDetails',
            # 'creditLimit',
            # 'debitLimit',
            # 'creditAmount',
            # 'debitAmount',
            'approvalStatus',
            'approvalBy',
            'approvalDate',
            'created',
            'modified',
            'companyAddress',
            # 'company',
            'status',
            'POC',
            'zipCode',
        ]

    def create(self, validated_data):
        # party_obj = super().create(validated_data)
        # party_obj.party_code = NumberConstructor().generate_next_sequence(NumberConstructorConstants.PARTY_NUMBERING,
        #                                                                   False)
        # party_obj.save()
        validated_data['party_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                  PARTY_NUMBERING, False)
        party_obj = models.PartyMaster.objects.create(**validated_data)

        return party_obj

    def to_representation(self, instance):
        data = super(PartyMasterSerializer, self).to_representation(instance)
        # party_list = models.PartyMaster.objects.filter(id=data['id']).all().values('company')[0]
        # data['company_name'] = \
        #     models.Company.objects.filter(id=party_list['company']).all().values('company_name')[0][
        #         'company_name']
        return data


class ProductCategorySerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(max_length=100, source='category_name')
    categoryCode = serializers.CharField(max_length=100, allow_blank=True, source='category_code')
    categoryDescription = serializers.CharField(source='category_description', allow_blank=True)

    # Images = serializers.ImageField(allow_null=True, source='images')

    class Meta:
        model = models.ProductCategory
        fields = [
            "id",
            "categoryName",
            "categoryCode",
            "categoryDescription",
            "images",
            'created',
            'modified',
        ]

    def create(self, validated_data):
        # product_obj = super().create(validated_data)
        validated_data['category_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                     PRODUCT_CATEGORY_NUMBERING, False)
        product_obj = models.ProductCategory.objects.create(**validated_data)

        # product_obj.save()
        return product_obj

    def validate(self, attrs):
        try:
            obj = models.ProductCategory.objects.get(category_name=attrs['category_name'])
        except models.ProductCategory.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['category_name'] + '  already exists')
        return attrs


class ProductSubCategorySerializer(serializers.ModelSerializer):
    productCategory = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all(), source='category')
    subCategoryName = serializers.CharField(max_length=100, source='subcat_name')
    subCategoryCode = serializers.CharField(max_length=30, allow_blank=True, source='subcat_code')

    class Meta:
        model = models.ProductSubCategory
        fields = [
            "id",
            "productCategory",
            "subCategoryName",
            "subCategoryCode",
            "subcat_descriptions",
            "subcat_images",
            'created',
            'modified',
        ]

    def create(self, validated_data):
        validated_data['subcat_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                   PRODUCT_SUB_CATEGORY_NUMBERING, False)
        # print("validated data",validated_data)
        product_sub_obj = models.ProductSubCategory.objects.create(**validated_data)
        product_sub_obj.save()
        return product_sub_obj

    def validate(self, attrs):
        try:
            obj = models.ProductSubCategory.objects.get(subcat_name=attrs['subcat_name'])
        except models.ProductSubCategory.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['subcat_name'] + '  already exists')
        return attrs

    def to_representation(self, instance):
        data = super(ProductSubCategorySerializer, self).to_representation(instance)
        company_list = models.ProductSubCategory.objects.filter(id=data['id']).all().values('category')[0]
        # print("check company",company_list)
        data['categoryName'] = \
            models.ProductCategory.objects.filter(id=company_list['category']).all().values('category_name')[0][
                'category_name']
        return data
    # def to_representation(self, instance):
    #     # self.fields['productCategory'] = ProductCategorySerializer(instance, read_only=True, many=True)
    #     res = super(ProductSubCategorySerializer, self).to_representation(instance)
    #     res['category_name'] = ProductCategorySerializer(instance.category_name, read_only=True, many=False).data
    #     return super(ProductSubCategorySerializer, self).to_representation(instance)


class UnitMasterSerializer(serializers.ModelSerializer):
    PrimaryUnit = serializers.CharField(source='primary_unit')
    SecondaryUnit = serializers.CharField(source='secondary_unit')
    ConversionFactors = serializers.CharField(source='conversion_factors')
    ConversionTotal = serializers.CharField(source='conversion_total')

    class Meta:
        model = models.UnitMaster
        fields = [
            "id",
            "PrimaryUnit",
            "SecondaryUnit",
            "ConversionFactors",
            "ConversionTotal",
            'created',
            'modified',

        ]


class ProductMasterImageUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProductMasterImageUpload
        fields = [
            "id",
            "product_creation",
            "file",
        ]


class ProductMasterSerializer(serializers.ModelSerializer):
    productCategory = serializers.PrimaryKeyRelatedField(allow_null=True, required=False,
                                                         queryset=ProductCategory.objects.all(),
                                                         source='product_category')
    productSubCategory = serializers.PrimaryKeyRelatedField(allow_null=True, required=False,
                                                            queryset=ProductSubCategory.objects.all(),
                                                            source='product_sub_category')
    units = serializers.PrimaryKeyRelatedField(allow_null=True, required=False, queryset=UnitMaster.objects.all(),
                                               source='unit')

    productName = serializers.CharField(max_length=100, source='product_name')
    productCode = serializers.CharField(allow_blank=True, source='product_code')
    usageType = serializers.CharField(allow_blank=True, required=False, source='usage_type')
    safetyStockLevel = serializers.CharField(allow_blank=True, required=False, source='safety_stock_level')
    # productImages = serializers.ImageField(source='product_images')
    countryCode = serializers.CharField(allow_blank=True, required=False, source='country_code')
    unitPrice = serializers.FloatField(source='unit_price')
    currencyType = serializers.CharField(allow_blank=True, source='currency_type')
    minTemp = serializers.CharField(allow_blank=True, required=False, source='min_temp')
    maxTemp = serializers.CharField(allow_blank=True, required=False, source='max_temp')

    # priceMethod = serializers.CharField(source='price_method')
    # basePrice = serializers.FloatField(source='base_price')
    # taxGst = serializers.IntegerField(source='tax_gst')
    # totalPrice = serializers.FloatField(source='total_price')
    # salesMargin = serializers.IntegerField(source='sales_margin')
    # typeBasePrice = serializers.CharField(source='type_base_price')
    # salesBasePrice = serializers.FloatField(source='sales_base_price')
    # salesGst = serializers.IntegerField(source='sales_gst')
    # salesPrice = serializers.FloatField(source='sales_price')
    # maxPerDis = serializers.IntegerField(source='max_per_dis')
    # maxAmtDis = serializers.FloatField(source='max_amt_dis')
    images = ProductMasterImageUploadSerializer(many=True, allow_null=True, required=False)

    class Meta:
        model = models.ProductMaster
        fields = [
            "id",
            "productCategory",
            "productSubCategory",
            "units",
            "productName",
            "productCode",
            "usageType",
            "safetyStockLevel",
            # "product_images",
            # "priceMethod",
            # "basePrice",
            # "taxGst",
            # "totalPrice",
            # "salesMargin",
            # "typeBasePrice",
            # "salesBasePrice",
            # "salesGst",
            # "salesPrice",
            # "maxPerDis",
            # "maxAmtDis",
            "type",
            "country",
            "countryCode",
            "technical_specification",
            "hsn",
            'created',
            'modified',
            'unitPrice',
            'currencyType',
            'minTemp',
            'maxTemp',
            'images',
        ]

    def create(self, validated_data):
        # product_master_obj = super().create(validated_data)
        # product_master_obj.product_code = NumberConstructor().generate_next_sequence(
        #     NumberConstructorConstants.PRODUCT_MASTER_NUMBERING, False)
        # product_master_obj.save()

        validated_data['product_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                    PRODUCT_MASTER_NUMBERING,
                                                                                    False)
        image_list = self.initial_data.getlist('images')
        product_master_obj = models.ProductMaster.objects.create(**validated_data)
        for item in image_list:
            # print('images', item)
            models.ProductMasterImageUpload.objects.create(product_creation=product_master_obj,
                                                           file=item)
        product_master_obj.save()
        return product_master_obj

    def update(self, instance, validated_data):
        image_list = self.initial_data.getlist('images')
        product_master_obj = models.ProductMaster.objects.filter(id=instance.id).update(**validated_data)
        for item in image_list:
            # print('images', item)
            models.ProductMasterImageUpload.objects.create(product_creation=instance, file=item)
        return instance

    def validate(self, attrs):
        try:
            obj = models.ProductMaster.objects.get(product_name=attrs['product_name'])
        except models.ProductMaster.DoesNotExist:
            pass
        else:
            if self.instance and obj.id == self.instance.id:
                pass
            else:
                raise serializers.ValidationError(attrs['product_name'] + '  already exists')
        return attrs

    # def to_representation(self, instance):
    #     data = super(ProductMasterSerializer, self).to_representation(instance)
    #     print('product', data)
        # company_list = models.ProductMaster.objects.filter(id=data['id']).all().values('product_category')[0]
        # print("check company",company_list)
        # data['category_name'] = \
        #     models.ProductCategory.objects.filter(id=company_list['product_category']).all().values('category_name')[0][
        #         'category_name']
        # return data
    # self.fields['productCategory'] = ProductCategorySerializer(instance, read_only=True, many=True)
    # self.fields['productSubCategory'] = ProductSubCategorySerializer(instance, read_only=True, many=True)
    # self.fields['units'] = UnitMasterSerializer(instance, read_only=True, many=True)
    # return super(ProductMasterSerializer, self).to_representation(instance)



