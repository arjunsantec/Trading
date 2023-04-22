import ast

from PIL.Image import Image
from django.db.models import Q
from django.forms import ClearableFileInput
from rest_framework import serializers
from rest_framework.utils import json
from .models import Trade,TradeData

class TradeSerializer(serializers.ModelSerializer):
    currentDate = serializers.CharField(max_length=100, allow_blank=True, source="date")
    companyCode = serializers.CharField(max_length=100, allow_blank=True, source="company")
    class Meta:
        model = Trade
        fields = [
            'id',
            'currentDate',
            'companyCode',
        ]


class TradeDataSerializer(serializers.ModelSerializer):
  class Meta:
     model=TradeData
     fields="__all__"

