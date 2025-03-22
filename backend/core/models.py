from django.db import models

class Offering(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donor_name = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField()
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Offering on {self.date}"

class Rota(models.Model):
    title = models.CharField(max_length=200)  # e.g., "Sunday Service Rota"
    date = models.DateField()
    details = models.TextField()  # e.g., "Reader: Jane, Server: John"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.date}"

class BibleVerse(models.Model):
    verse_text = models.TextField()
    reference = models.CharField(max_length=100)  # e.g., "John 3:16"
    date = models.DateField(unique=True)  # One verse per day
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reference
        
from cloudinary.models import CloudinaryField

class GalleryItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    video = CloudinaryField('video', blank=True, null=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title














