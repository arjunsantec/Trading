from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()
router.register("PartyMaster", api.PartyMasterViewSet)
router.register("ProductCategory", api.ProductCategoryViewSet)
router.register("ProductSubCategory", api.ProductSubCategoryViewSet)
router.register("UnitMaster", api.UnitMasterViewSet)
router.register("ProductMaster", api.ProductMasterViewSet)
router.register("ProductImageUpload", api.ProductImageUploadViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
)