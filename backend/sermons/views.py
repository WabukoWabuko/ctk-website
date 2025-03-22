from rest_framework import generics
from .models import Sermon
from .serializers import SermonSerializer

class SermonList(generics.ListCreateAPIView):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer

class SermonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer
