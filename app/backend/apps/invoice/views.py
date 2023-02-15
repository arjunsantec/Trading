from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse, HttpResponse
from .service import InvoiceService


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_batch_number(request):
    invoice_service = InvoiceService()
    batch_list = invoice_service.get_batch_number()
    return JsonResponse({"batch_number": list(batch_list)}, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_quantity(request):
    invoice_service = InvoiceService()
    batch = request.query_params['batch']
    quantity = invoice_service.get_quantity(batch)
    return JsonResponse({"quantity": quantity[0], "price": quantity[1]}, safe=False)

