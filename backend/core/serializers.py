from rest_framework import serializers
from .models import (Offering, Rota, BibleVerse, GalleryItem, PrayerRequest, LiturgicalEvent, News,
                     VolunteerSlot, Stream, DirectoryEntry, Ministry, LectionaryReading, SermonNote, Feedback)
from events.serializers import EventSerializer
from sermons.serializers import SermonSerializer

class OfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offering
        fields = '__all__'

class RotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rota
        fields = '__all__'

class BibleVerseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BibleVerse
        fields = '__all__'

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'

class PrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'

class LiturgicalEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiturgicalEvent
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class VolunteerSlotSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    rota = RotaSerializer(read_only=True)
    class Meta:
        model = VolunteerSlot
        fields = '__all__'

class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = '__all__'

class DirectoryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectoryEntry
        fields = '__all__'

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = '__all__'

class LectionaryReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectionaryReading
        fields = '__all__'

class SermonNoteSerializer(serializers.ModelSerializer):
    sermon = SermonSerializer(read_only=True)
    class Meta:
        model = SermonNote
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
