from django.contrib import admin

# Register your models here.
from django.contrib.admin import ModelAdmin

from apps.company.models import Company, CompanyUser, AppSettings

admin.site.register(Company)
admin.site.register(CompanyUser)

class AppSettingsForm(ModelAdmin):
    list_display = ['app_key', 'app_value']

    class Meta:
        model = AppSettings
        fields = '__all__'
        exclude = ['user_created', 'user_modified', 'hostname_created', 'hostname_modified',
                   'device_created', 'device_modified']

admin.site.register(AppSettings, AppSettingsForm)

