import ast

from PIL.Image import Image
from django.db.models import Q
from django.forms import ClearableFileInput
from rest_framework import serializers
from rest_framework.utils import json

from . import models


class MEDEstimationSheetSerializer(serializers.ModelSerializer):
    depotWONo = serializers.CharField(max_length=100, allow_blank=True, source="depot_wo_no")
    depotWODate = serializers.CharField(max_length=100, allow_blank=True, source="depot_wo_no_date")

    bwgControlNo = serializers.CharField(max_length=100, allow_blank=True, source="bwg_control_no")
    bwgControlDate = serializers.CharField(max_length=100, allow_blank=True, source="bwg_control_date")
    drawingNo = serializers.CharField(max_length=100, allow_blank=True, source="drawing_no")
    Precedence = serializers.CharField(max_length=100, allow_blank=True, source="precedence")
    partNo = serializers.CharField(max_length=100, allow_blank=True, source="part_no")
    Nomenclature = serializers.CharField(max_length=100, allow_blank=True, source="nomenclature")
    Quantity = serializers.CharField(max_length=100, allow_blank=True, source="quantity")
    materialInspectionBy = serializers.CharField(max_length=100, allow_blank=True, source="material_inspection_by")
    jobNo = serializers.CharField(max_length=250, allow_blank=True, source="job_no")
    Year = serializers.CharField(max_length=250, allow_blank=True, source="year")
    Date = serializers.CharField(max_length=250, allow_blank=True, source="date")

    estimationList = MEDEstimationSheetDetailsSerializer(many=True, required=False, allow_null=True)

    estimationSheetQuery = MEDEstimationSheetQuerySerializer(many=True, required=False, allow_null=True,
                                                             read_only=True)

    class Meta:
        model = models.MEDEstimationSheet
        fields = [
            'id',
            'estimationList',
            'depotWONo',
            'depotWODate',
            'bwgControlNo',
            'bwgControlDate',
            'drawingNo',
            'Precedence',
            'partNo',
            'Nomenclature',
            'Quantity',
            'materialInspectionBy',
            'jobNo',
            'Nomenclature',
            'Year',
            'Date',
            'images',
            'estimationSheetQuery',
            'status'
        ]
