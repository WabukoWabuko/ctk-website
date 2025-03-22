from rest_framework import serializers
from .models import Sermon

class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = ['id', 'title', 'date', 'audio_url', 'text', 'created_at']
