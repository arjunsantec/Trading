from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse, HttpResponse
from .service import SalesService

# Create your views here.


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_product_tagging_list(request):
    sales_service = SalesService()
    batch = request.query_params['batch']
    product_tagging_list = sales_service.get_product_tagging_list(batch)
    return JsonResponse(product_tagging_list, safe=False)

