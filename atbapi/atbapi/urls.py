from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('topics.urls')),
    path('api/', include('posts.urls')),

    # Swagger/OpenAPI endpoints
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
urlpatterns += static(settings.AVATARS_URL, document_root=settings.AVATARS_ROOT)
urlpatterns += static(settings.VIDEOS_URL, document_root=settings.VIDEOS_ROOT )
