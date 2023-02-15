"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers

from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Amigeo ERP",
        default_version='v1',
        description="Amigeo ERP",
        terms_of_service="https://www.sanaditechnologies.com",
        contact=openapi.Contact(email="info@sanaditechnologies.com"),
        license=openapi.License(name="Awesome IP"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    re_path(r'^doc(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),  # <-- Here
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),  # <-- Here
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),  # <-- Here
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('security/', include('apps.security.urls')),
    path('company/', include('apps.company.urls')),
    path('master/', include('apps.masters.urls')),
    path('sales/', include('apps.sales.urls')),
    path('inventory/', include('apps.inventory.urls')),
    path('warehouse/', include('apps.wareshouse.urls')),
    path('studymanage/', include('apps.studymanage.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
    path('ReportEngineMain/', include('apps.reportengine.urls')),
    path('Finance/', include('apps.finance.urls')),
    path('Invoice/', include('apps.invoice.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
