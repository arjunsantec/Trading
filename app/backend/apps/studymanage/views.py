from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse, HttpResponse
from .service import StudyManageService


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_project_name(request):
    study_manage_service = StudyManageService()
    project_id = request.query_params['project_id']
    project_name = study_manage_service.get_project_name(project_id)
    return JsonResponse(project_name, safe=False)

