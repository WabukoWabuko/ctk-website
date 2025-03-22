from rest_framework import generics, permissions
from .models import (Offering, Rota, BibleVerse, GalleryItem, PrayerRequest, LiturgicalEvent, News,
                     VolunteerSlot, Stream, DirectoryEntry, Ministry, LectionaryReading, SermonNote, Feedback)
from .serializers import (OfferingSerializer, RotaSerializer, BibleVerseSerializer, GalleryItemSerializer,
                          PrayerRequestSerializer, LiturgicalEventSerializer, NewsSerializer, VolunteerSlotSerializer,
                          StreamSerializer, DirectoryEntrySerializer, MinistrySerializer, LectionaryReadingSerializer,
                          SermonNoteSerializer, FeedbackSerializer)

class OfferingList(generics.ListCreateAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer
    permission_classes = [permissions.IsAuthenticated]

class OfferingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer
    permission_classes = [permissions.IsAuthenticated]

class RotaList(generics.ListCreateAPIView):
    queryset = Rota.objects.all()
    serializer_class = RotaSerializer
    permission_classes = [permissions.IsAuthenticated]

class RotaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rota.objects.all()
    serializer_class = RotaSerializer
    permission_classes = [permissions.IsAuthenticated]

class BibleVerseList(generics.ListCreateAPIView):
    queryset = BibleVerse.objects.all()
    serializer_class = BibleVerseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BibleVerseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BibleVerse.objects.all()
    serializer_class = BibleVerseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class GalleryItemList(generics.ListCreateAPIView):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class GalleryItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PrayerRequestList(generics.ListCreateAPIView):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PrayerRequestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

class LiturgicalEventList(generics.ListCreateAPIView):
    queryset = LiturgicalEvent.objects.all()
    serializer_class = LiturgicalEventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LiturgicalEventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LiturgicalEvent.objects.all()
    serializer_class = LiturgicalEventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class VolunteerSlotList(generics.ListCreateAPIView):
    queryset = VolunteerSlot.objects.all()
    serializer_class = VolunteerSlotSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class VolunteerSlotDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VolunteerSlot.objects.all()
    serializer_class = VolunteerSlotSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class StreamList(generics.ListCreateAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class StreamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DirectoryEntryList(generics.ListCreateAPIView):
    queryset = DirectoryEntry.objects.all()
    serializer_class = DirectoryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

class DirectoryEntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DirectoryEntry.objects.all()
    serializer_class = DirectoryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

class MinistryList(generics.ListCreateAPIView):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MinistryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LectionaryReadingList(generics.ListCreateAPIView):
    queryset = LectionaryReading.objects.all()
    serializer_class = LectionaryReadingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LectionaryReadingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LectionaryReading.objects.all()
    serializer_class = LectionaryReadingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SermonNoteList(generics.ListCreateAPIView):
    queryset = SermonNote.objects.all()
    serializer_class = SermonNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SermonNoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SermonNote.objects.all()
    serializer_class = SermonNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.AllowAny]  # Public can submit

class FeedbackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]
