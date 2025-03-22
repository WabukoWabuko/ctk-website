from django.contrib import admin
from django.urls import path, include
from events.views import EventList, EventDetail
from sermons.views import SermonList, SermonDetail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', EventList.as_view(), name='event-list'),
    path('api/events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('api/sermons/', SermonList.as_view(), name='sermon-list'),
    path('api/sermons/<int:pk>/', SermonDetail.as_view(), name='sermon-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
