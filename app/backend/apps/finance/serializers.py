from rest_framework import serializers
from . import models
# from .models import ProductCategory, ProductSubCategory, UnitMaster
# from apps.utils.number_constuctor import NumberConstructor
# from apps.utils.constants import NumberConstructorConstants


class PriceSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PriceSetting
        fields = [
            'id',
            'project',
            'Currency',
            'shelfRate',
            'fridgeRate',
            'palletRate',
            # 'palletCurrency',
            'paddonsRate',
            # 'paddonsCurrency',
            'boxRate',
            # 'boxCurrency',
            'pricingDate',
        ]

    # def create(self, validated_data):
    #     # party_obj = super().create(validated_data)
    #     # party_obj.party_code = NumberConstructor().generate_next_sequence(NumberConstructorConstants.PARTY_NUMBERING,
    #     #                                                                   False)
    #     # party_obj.save()
    #     validated_data['party_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
    #                                                                               PARTY_NUMBERING, False)
    #     party_obj = models.PartyMaster.objects.create(**validated_data)
    #
    #     return party_obj

    def to_representation(self, instance):
        data = super(PriceSettingSerializer, self).to_representation(instance)
        price_list = models.PriceSetting.objects.filter(id=data['id']).all().values('project')[0]
        data['projectName'] = \
            models.ProjectCreation.objects.filter(id=price_list['project']).all().values('project_name')[0][
                'project_name']
        return data


