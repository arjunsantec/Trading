from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator

from .service import InventoryService


# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_tag_product_list(request):
    inventory_service = InventoryService()
    w_id = request.query_params['w_id']
    z_id = request.query_params['z_id']
    product_list = inventory_service.get_tagging_product_list(z_id, w_id)
    return JsonResponse(product_list, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_all_product_list(request):
    inventory_service = InventoryService()
    w_id = request.query_params['w_id']
    product_list = inventory_service.get_all_tagging_product_list(w_id)
    return JsonResponse(product_list, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_tag_batch_list(request):
    inventory_service = InventoryService()
    prod_id = request.query_params['p_id']
    w_id = request.query_params['w_id']
    z_id = request.query_params['z_id']
    batch_list = inventory_service.get_tagging_batch_list(prod_id, z_id, w_id)
    return JsonResponse(batch_list, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_product_tagging_list(request):
    inventory_service = InventoryService()
    project = request.query_params['project']
    f_date = request.query_params['f_date']
    to_date = request.query_params['to_date']
    page_number = request.query_params['page']
    product_list = inventory_service.get_product_tagging_list(project, f_date, to_date)
    paginator = Paginator(product_list, 10)
    page_obj = paginator.get_page(page_number)
    page_result = dict(
            page_data=page_obj.object_list,
            count=paginator.count,
            current_page=page_obj.number,
            # brands=brands
        )
    return JsonResponse(page_result, safe=False)


