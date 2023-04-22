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
   print("bandide")
   date_enter =   request.data.get('date')
   ticker_value = request.data.get('ticker')
   interval_val = request.data.get('interval')
   print("bartide")
   print(date_enter, ticker_value, interval_val)
   print (type(date_enter))
   fn = stock_service.inputs_final(date_enter, ticker_value, interval_val)
   print("data sent to service ")
   if fn:
      
      with open(fn, 'rb') as f:
         content_type = 'application/octet-stream'
         response = HttpResponse(f.read(), content_type=content_type)
         response['Content-Disposition'] = f'attachment; filename="{os.path.basename(fn)}"'
         return response
   else:
      
      error_message = "Unable to generate the Excel file."
      return HttpResponse(error_message, status=400)