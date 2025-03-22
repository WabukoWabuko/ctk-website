from rest_framework import generics, permissions
from .models import Offering
from .serializers import OfferingSerializer

class OfferingList(generics.ListCreateAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer
    permission_classes = [permissions.IsAuthenticated]  # Admin only

class OfferingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer
    permission_classes = [permissions.IsAuthenticated]
