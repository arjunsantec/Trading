from django.template.defaulttags import url
from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()
router.register("ContractReview", api.ContractReviewViewSet)
router.register("OrderAcceptance", api.OrderAcceptanceViewSet)
router.register("OrderAcceptanceDetails", api.OrderAcceptanceDetailsViewSet)
router.register("ProjectCreation", api.ProjectCreationViewSet)
router.register("ProformaKitCreation", api.ProformaKitCreationViewSet)
router.register("CMTRFCreation", api.CMTRFCreationViewSet)
router.register("ProjectFileUpload", api.ProjectCreationFileUploadViewSet)
 
urlpatterns = (
    path("api/v1/", include(router.urls)),
    path("api/v1/BatchProductTaggingList", views.get_product_tagging_list, name='batch_product_tagging_list'),
)