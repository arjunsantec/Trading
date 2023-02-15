from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()

router.register("StudyMaterialReturn", api.StudyMaterialReturnViewSet)
router.register("StudyMaterialDestruction", api.StudyMaterialDestructionViewSet)
router.register("StudyMaterialDelivery", api.StudyMaterialDeliveryViewSet)
router.register("SitePatientDelivery", api.DeliverySitePatientViewSet)
router.register("NurseToPatient", api.NurseToPatientViewSet)
router.register("SiteToSite", api.SiteToSiteViewSet)
router.register("StudyMaterialExported", api.StudyMaterialExportedViewSet)
router.register("ExpireDateChange", api.ExpireDateChangeViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path("api/v1/GetProjectName", views.get_project_name, name='project_name'),
)
