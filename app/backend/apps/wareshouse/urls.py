from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()
router.register("WareHouseCreation", api.WareHouseCreationViewSet)
router.register("StorageZoneCreation", api.StorageZoneCreationViewSet)
router.register("ZoneLevelCreation", api.ZoneLevelCreationViewSet)
router.register("ZoneLevelDetails", api.ZoneLevelCreationDetailsViewSet)
router.register("StorageTypeCreation", api.StorageTypeCreationViewSet)
router.register("ShelfCreation", api.ShelfCreationViewSet)
# router.register("GoodsAcceptance", api.GoodsAcceptanceViewSet)
router.register("RackToRackTransfer", api.RackToRackTransferViewSet)
router.register("ZoneToZoneTransfer", api.ZoneToZoneTransferViewSet)
router.register("PalletCreation", api.PalletCreationViewSet)
router.register("Refrigeration", api.RefrigerationViewSet)


urlpatterns = (
    path("api/v1/", include(router.urls)),
)
