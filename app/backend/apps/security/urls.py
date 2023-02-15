

from django.conf import settings

from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import CreateUserAPIView, CustomTokenObtainPairView,  change_password, \
    get_user_permissions
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()


urlpatterns = [
    path('api/v1/usermanager/', CreateUserAPIView.as_view()),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/change_password', change_password, name="change_password"),
    path('api/v1/get_permissions', get_user_permissions, name="get_user_permissions"),
]