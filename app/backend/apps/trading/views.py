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
    data_list = stock_service.trade()
    return JsonResponse(data_list, safe=False)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_live_data(request):
    stock_service = StockService()
    data_list = stock_service.live_data()
    return JsonResponse(data_list, safe=False)





    stock_service = StockService()
    data_list = stock_service.inputs_final()
    return JsonResponse(data_list, safe=False)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def get_value(request):
    try:
        program = ProgramDataMapping()
        program_id = request.data['program_id']
        to_date = request.data['to_date']
        stock_service = StockService()
        data_list = stock_service.inputs_final()
        return JsonResponse(prog, safe=False, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse(str(e), safe=False, status=status.HTTP_403_FORBIDDEN)