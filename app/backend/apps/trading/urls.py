from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views,api

router = routers.DefaultRouter()
router.register("trading", api.TradeViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path('api/v1/Trade', views.trade, name="trade"),
    path('api/v1/get_live_data', views.get_live_data, name="get_live_data"),
    path('api/v1/get_stock_data', views.inputs_final, name="get_stock_data"),
)