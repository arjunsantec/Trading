from django.urls import path, include
from rest_framework import routers

from . import views, service

router = routers.DefaultRouter()

urlpatterns = (
    path("api/v1/", include(router.urls)),
    path('api/v1/CountProject', views.count_project, name="count_project"),
    path('api/v1/CountWarehouse', views.count_warehouse, name="count_warehouse"),
    path('api/v1/CountRack', views.count_rack, name="count_rack"),
    path('api/v1/CountShelf', views.count_shelf, name="count_shelf"),
    path('api/v1/CountShelfClosed', views.count_closed_shelf, name="count_shelf_closed"),
    # path('api/v1/count_zone', views.count_project, name="count_zone"),
)
