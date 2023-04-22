from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers
from . import views,api


router = routers.DefaultRouter()
router.register("trading", api.TradeViewSet)
router.register("trade", api.TradeViewSet)
router.register("trade_list", api.TradeListViewSet)

urlpatterns = (
path("api/v1/", include(router.urls)),
#path('api/v1/Trade', views.trade),
path('api/v1/trade_algorithm', views.trade_algorithm)
)