from django.db import models
from cloudinary.models import CloudinaryField

class Event(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    video = CloudinaryField('video', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
