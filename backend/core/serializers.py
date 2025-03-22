from rest_framework import serializers
from .models import Offering, Rota, BibleVerse, GalleryItem

class OfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offering
        fields = ['id', 'amount', 'donor_name', 'date', 'note', 'created_at']

class RotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rota
        fields = ['id', 'title', 'date', 'details', 'created_at']

class BibleVerseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BibleVerse
        fields = ['id', 'verse_text', 'reference', 'date', 'created_at']

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = ['id', 'title', 'description', 'image', 'video', 'date', 'created_at']
