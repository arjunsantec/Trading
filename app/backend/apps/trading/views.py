from django.shortcuts import render
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import JsonResponse, HttpResponse
from .service import StockService
# Create your views here.

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def trade(request):
    stock_service = StockService()
    data_list = dashboard_service.count_project()
    return JsonResponse(data_list, safe=False)