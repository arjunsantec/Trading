from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views,api

router = routers.DefaultRouter()
router.register("trading", api.TradeViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path('api/v1/Trade', views.trade, name="trade"),
)