from django.contrib import admin
from django.urls import path
from events.views import EventList, EventDetail
from sermons.views import SermonList, SermonDetail
from core.views import (
    OfferingList, OfferingDetail, RotaList, RotaDetail,
    BibleVerseList, BibleVerseDetail, GalleryItemList, GalleryItemDetail
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', EventList.as_view(), name='event-list'),
    path('api/events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('api/sermons/', SermonList.as_view(), name='sermon-list'),
    path('api/sermons/<int:pk>/', SermonDetail.as_view(), name='sermon-detail'),
    path('api/offerings/', OfferingList.as_view(), name='offering-list'),
    path('api/offerings/<int:pk>/', OfferingDetail.as_view(), name='offering-detail'),
    path('api/rotas/', RotaList.as_view(), name='rota-list'),
    path('api/rotas/<int:pk>/', RotaDetail.as_view(), name='rota-detail'),
    path('api/verses/', BibleVerseList.as_view(), name='verse-list'),
    path('api/verses/<int:pk>/', BibleVerseDetail.as_view(), name='verse-detail'),
    path('api/gallery/', GalleryItemList.as_view(), name='gallery-list'),
    path('api/gallery/<int:pk>/', GalleryItemDetail.as_view(), name='gallery-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
