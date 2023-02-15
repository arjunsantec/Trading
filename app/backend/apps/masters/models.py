from contextlib import nullcontext
from email.policy import default
from enum import unique
from unicodedata import decimal
from django.db import models
from apps.company.models import Company
from apps.audit_fields.models import AuditUuidModelMixin
from apps.audit_fields.models.audit_uuid_model_mixin import ApprovalModel


# Create your models here.


class PartyMaster(AuditUuidModelMixin, ApprovalModel):
    party_name = models.CharField(max_length=100, null=True)

    # company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="Company", default="", null=True, blank=True)
    company_address = models.CharField(max_length=250, default=None, null=True, blank=True)
    party_code = models.CharField(max_length=50, default=None, null=True)
    tax_no = models.CharField(max_length=50, default=None, null=True)
    phone_number = models.CharField(max_length=50, default=None)
    party_type = models.CharField(max_length=100, default=None, null=True)
    # org_type = models.CharField(max_length=100,default=None,null=True)
    state = models.CharField(max_length=250, default=None, null=True, blank=True)
    state_code = models.CharField(max_length=250, default=None, null=True)
    country = models.CharField(max_length=250, default=None, null=True)
    country_code = models.CharField(max_length=250, default=None, null=True)
    # billing_address = models.TextField(default=None,null=True)
    # bank_details = models.TextField(default=None,null=True)
    shipping_address = models.TextField(default=None, null=True)
    POC = models.TextField(default=None, null=True)
    # credit_limit = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    # debit_limit = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    # credit_amount = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    # debit_amount= models.DecimalField(max_digits=10,decimal_places=2,default=0)
    email = models.CharField(max_length=100, default=None, null=True, blank=True)
    status = models.CharField(max_length=100, default=None, null=True)
    zip_code = models.CharField(max_length=50, default=None, null=True)

    class Meta:
        pass


# Create your models here.

class ProductCategory(AuditUuidModelMixin):
    category_name = models.CharField(max_length=100, blank=True, unique=True)
    category_code = models.CharField(max_length=30, blank=True)
    category_description = models.TextField(default=None, blank=True, null=True)
    images = models.ImageField(upload_to="images", blank=True)

    class Meta:
        pass


class ProductSubCategory(AuditUuidModelMixin):
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="Product_category")
    subcat_name = models.CharField(max_length=100, blank=True, unique=True)
    subcat_code = models.CharField(max_length=30, blank=True)
    subcat_descriptions = models.TextField(blank=True, null=True)
    subcat_images = models.ImageField(upload_to="images", blank=True)

    class Meta:
        pass



class UnitMaster(AuditUuidModelMixin):
    primary_unit = models.CharField(max_length=30, blank=True)
    secondary_unit = models.CharField(max_length=30, blank=True)
    conversion_factors = models.CharField(max_length=30, blank=True)
    conversion_total = models.CharField(max_length=30, blank=True)

    class Meta:
        unique_together = ('primary_unit', 'secondary_unit',)


class ProductMaster(AuditUuidModelMixin):
    # Foreignkey relationship
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="product_category",
                                         blank=True, null=True)
    product_sub_category = models.ForeignKey(ProductSubCategory, on_delete=models.CASCADE,
                                             related_name="product_sub_category",
                                             blank=True, null=True)
    unit = models.ForeignKey(UnitMaster, on_delete=models.CASCADE, related_name="unit", blank=True, null=True)

    product_name = models.CharField(max_length=100, blank=True, unique=True)
    hsn = models.CharField(max_length=30, blank=True)
    product_code = models.CharField(max_length=30, blank=True)
    type = models.CharField(max_length=30, blank=True)
    usage_type = models.CharField(max_length=30, blank=True, null=True)
    safety_stock_level = models.CharField(max_length=30, blank=True, null=True)
    # product_images = models.ImageField(upload_to="images", blank=True)
    country = models.CharField(max_length=100, blank=True)
    country_code = models.CharField(max_length=30, blank=True)
    technical_specification = models.TextField(blank=True, null=True)
    # price_method = models.CharField(max_length=30, blank=True)
    unit_price = models.CharField(max_length=250, null=True, blank=True, default=None)
    currency_type = models.CharField(max_length=100, null=True, blank=True)
    min_temp = models.CharField(max_length=200, null=True, blank=True)
    max_temp = models.CharField(max_length=200, null=True, blank=True)

    # tax_gst = models.IntegerField(blank=True, null=True)
    # total_price = models.FloatField(null=True, blank=True, default=None)
    # sales_margin = models.IntegerField(blank=True, null=True)
    # type_base_price = models.CharField(max_length=30, blank=True)
    # sales_base_price = models.FloatField(null=True, blank=True, default=None)
    # sales_gst = models.IntegerField(blank=True, null=True)
    # sales_price = models.FloatField(null=True, blank=True, default=None)
    # max_per_dis = models.IntegerField(blank=True, null=True)
    # max_amt_dis = models.FloatField(null=True, blank=True, default=None)

    class Meta:
        pass


class ProductMasterImageUpload(AuditUuidModelMixin):
    product_creation = models.ForeignKey(ProductMaster, default="", on_delete=models.CASCADE,
                                         related_name="images", blank=True)
    file = models.ImageField(upload_to="images", null=True, blank=True, default=None)

    class Meta:
        pass

