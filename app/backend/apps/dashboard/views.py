from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import JsonResponse, HttpResponse
from .service import DashboardService

# Create your views here.


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def count_project(request):
    dashboard_service = DashboardService()
    project_list = dashboard_service.count_project()
    return JsonResponse(project_list, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def count_warehouse(request):
    dashboard_service = DashboardService()
    warehouse_list = dashboard_service.count_warehouse()
    return JsonResponse(warehouse_list, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def count_rack(request):
    dashboard_service = DashboardService()
    rack_list = dashboard_service.count_rack()
    return JsonResponse(rack_list, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def count_shelf(request):
    dashboard_service = DashboardService()
    shelf_list = dashboard_service.count_shelf()
    return JsonResponse(shelf_list, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def count_closed_shelf(request):
    dashboard_service = DashboardService()
    closed_shelf = dashboard_service.count_closed_shelf()
    return JsonResponse(closed_shelf, safe=False)

