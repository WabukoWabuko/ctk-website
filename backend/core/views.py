from rest_framework import generics, permissions
from .models import Offering, Rota, BibleVerse, GalleryItem
from .serializers import OfferingSerializer, RotaSerializer, BibleVerseSerializer, GalleryItemSerializer

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
