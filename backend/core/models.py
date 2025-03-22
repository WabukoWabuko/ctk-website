from django.db import models
from cloudinary.models import CloudinaryField

# Existing models: Offering, Rota, BibleVerse, GalleryItem
class Offering(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donor_name = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField()
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Offering on {self.date}"

class Rota(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.date}"

class BibleVerse(models.Model):
    verse_text = models.TextField()
    reference = models.CharField(max_length=100)
    date = models.DateField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reference

class GalleryItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    video = CloudinaryField('video', blank=True, null=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# New models
class PrayerRequest(models.Model):
    request = models.TextField()
    name = models.CharField(max_length=200, blank=True, null=True)
    is_anonymous = models.BooleanField(default=False)
    date_submitted = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Prayer from {self.name or 'Anonymous'}"

class LiturgicalEvent(models.Model):
    name = models.CharField(max_length=200)  # e.g., "Advent Sunday"
    date = models.DateField()
    color = models.CharField(max_length=50)  # e.g., "Purple"
    description = models.TextField()

    def __str__(self):
        return self.name

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class VolunteerSlot(models.Model):
    title = models.CharField(max_length=200)  # e.g., "Reader"
    event = models.ForeignKey('events.Event', on_delete=models.CASCADE, null=True, blank=True)
    rota = models.ForeignKey('core.Rota', on_delete=models.CASCADE, null=True, blank=True)
    volunteer_name = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.date}"

class Stream(models.Model):
    title = models.CharField(max_length=200)
    video_url = models.URLField()  # e.g., YouTube link
    date = models.DateTimeField()
    is_live = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class DirectoryEntry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Ministry(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    leader = models.CharField(max_length=200)
    meeting_time = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class LectionaryReading(models.Model):
    date = models.DateField()
    old_testament = models.CharField(max_length=100)
    psalm = models.CharField(max_length=100)
    epistle = models.CharField(max_length=100)
    gospel = models.CharField(max_length=100)

    def __str__(self):
        return f"Readings for {self.date}"

class SermonNote(models.Model):
    sermon = models.ForeignKey('sermons.Sermon', on_delete=models.CASCADE)
    file = CloudinaryField('file', blank=True, null=True)  # PDF or text
    description = models.TextField()

    def __str__(self):
        return f"Note for {self.sermon.title}"

class Feedback(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField()
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.name or 'Anonymous'}"
