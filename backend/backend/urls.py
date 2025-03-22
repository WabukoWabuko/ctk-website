from django.contrib import admin
from django.urls import path
from events.views import EventList, EventDetail
from sermons.views import SermonList, SermonDetail
from core.views import (
    OfferingList, OfferingDetail, RotaList, RotaDetail, BibleVerseList, BibleVerseDetail,
    GalleryItemList, GalleryItemDetail, PrayerRequestList, PrayerRequestDetail,
    LiturgicalEventList, LiturgicalEventDetail, NewsList, NewsDetail,
    VolunteerSlotList, VolunteerSlotDetail, StreamList, StreamDetail,
    DirectoryEntryList, DirectoryEntryDetail, MinistryList, MinistryDetail,
    LectionaryReadingList, LectionaryReadingDetail, SermonNoteList, SermonNoteDetail,
    FeedbackList, FeedbackDetail
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
    path('api/prayers/', PrayerRequestList.as_view(), name='prayer-list'),
    path('api/prayers/<int:pk>/', PrayerRequestDetail.as_view(), name='prayer-detail'),
    path('api/liturgical/', LiturgicalEventList.as_view(), name='liturgical-list'),
    path('api/liturgical/<int:pk>/', LiturgicalEventDetail.as_view(), name='liturgical-detail'),
    path('api/news/', NewsList.as_view(), name='news-list'),
    path('api/news/<int:pk>/', NewsDetail.as_view(), name='news-detail'),
    path('api/volunteers/', VolunteerSlotList.as_view(), name='volunteer-list'),
    path('api/volunteers/<int:pk>/', VolunteerSlotDetail.as_view(), name='volunteer-detail'),
    path('api/streams/', StreamList.as_view(), name='stream-list'),
    path('api/streams/<int:pk>/', StreamDetail.as_view(), name='stream-detail'),
    path('api/directory/', DirectoryEntryList.as_view(), name='directory-list'),
    path('api/directory/<int:pk>/', DirectoryEntryDetail.as_view(), name='directory-detail'),
    path('api/ministries/', MinistryList.as_view(), name='ministry-list'),
    path('api/ministries/<int:pk>/', MinistryDetail.as_view(), name='ministry-detail'),
    path('api/lectionary/', LectionaryReadingList.as_view(), name='lectionary-list'),
    path('api/lectionary/<int:pk>/', LectionaryReadingDetail.as_view(), name='lectionary-detail'),
    path('api/sermon-notes/', SermonNoteList.as_view(), name='sermon-note-list'),
    path('api/sermon-notes/<int:pk>/', SermonNoteDetail.as_view(), name='sermon-note-detail'),
    path('api/feedback/', FeedbackList.as_view(), name='feedback-list'),
    path('api/feedback/<int:pk>/', FeedbackDetail.as_view(), name='feedback-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
