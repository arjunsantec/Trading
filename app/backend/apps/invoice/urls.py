from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter()
router.register("InvoiceCreation", api.InvoiceCreationViewSet)

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path("api/v1/BatchNumberList", views.get_batch_number, name='batch_number_list'),
    path("api/v1/QuantityCount", views.get_quantity, name='quantity_count'),
)
