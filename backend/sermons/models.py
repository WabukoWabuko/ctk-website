from django.db import models
from cloudinary.models import CloudinaryField

class Sermon(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    audio_url = CloudinaryField('audio', blank=True, null=True)
    video_url = CloudinaryField('video', blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
