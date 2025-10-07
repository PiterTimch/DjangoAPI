from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
]
urlpatterns += static(settings.AVATARS_URL, document_root=settings.AVATARS_ROOT)