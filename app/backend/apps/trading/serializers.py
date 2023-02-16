import ast

from PIL.Image import Image
from django.db.models import Q
from django.forms import ClearableFileInput
from rest_framework import serializers
from rest_framework.utils import json

from . import models


class TradeSerializer(serializers.ModelSerializer):
    currentDate = serializers.CharField(max_length=100, allow_blank=True, source="date")
    companyCode = serializers.CharField(max_length=100, allow_blank=True, source="company_code")

    class Meta:
        model = models.Trade
        fields = [
            'id',
            'currentDate',
            'companyCode',
        ]
