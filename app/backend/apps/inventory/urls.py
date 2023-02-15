from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()

router.register("MaterialReceipt", api.MaterialReceiptViewSet)
router.register("ProductTagging", api.ProductTaggingViewSet)
router.register("GRNDetails", api.GRNDetailsViewSet)
router.register("GoodsAcceptance", api.GoodsAcceptanceViewSet)
router.register("GoodsAcceptanceDetails", api.GoodsAcceptanceDetailsViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path('api/v1/get_tag_product_list', views.get_tag_product_list, name="get_tag_product_list"),
    path('api/v1/get_tag_batch_list', views.get_tag_batch_list, name="get_tag_batch_list"),
    path('api/v1/get_tagging_product_list', views.get_product_tagging_list, name="get_tagging_product_list"),
    path('api/v1/get_all_product_list', views.get_all_product_list, name="get_all_product_list"),
)