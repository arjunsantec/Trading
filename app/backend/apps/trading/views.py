from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import TradeDataSerializer
from .models import TradeData
from rest_framework import permissions
from .service import StockService
from rest_framework.parsers import JSONParser
from rest_framework.viewsets import ModelViewSet
import os


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def trade(request):
   stock_service = StockService()
   data_list = stock_service.trade()
   return JsonResponse(data_list, safe=False)

@api_view(['post'])
@permission_classes((IsAuthenticated,))
def trade_algorithm(request):
   stock_service = StockService()
   
   date_entered = request.data.get('date')
   ticker_valued = request.data.get('ticker')
   interval_vald = request.data.get('interval')
   
   fn = stock_service.inputs_final(date_entered, ticker_valued, interval_vald)
   
   if fn:
      success_msg = "Successfully sent data to service."
      return HttpResponse(success_msg, status=200)

   else:
      error_message = "Unable to generate the Excel file."
      return HttpResponse(error_message, status=400)
