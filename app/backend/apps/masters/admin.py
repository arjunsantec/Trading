from django.contrib import admin

# Register your models here.
from django.contrib.admin import ModelAdmin

from apps.masters.models import ProductCategory, ProductSubCategory

admin.site.register(ProductCategory)
admin.site.register(ProductSubCategory)