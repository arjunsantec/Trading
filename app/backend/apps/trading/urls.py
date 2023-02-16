from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views,api

router = routers.DefaultRouter()
router.register("MED.JobbingProforma", api.MEDJobbingProformaViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
)