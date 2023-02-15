from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()
router.register("Company", api.CompanyViewSet)
router.register("CompanyUser", api.CompanyUserViewSet)
router.register("AppSettings", api.AppSettingViewSet)
router.register("Department", api.DepartmentViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
)