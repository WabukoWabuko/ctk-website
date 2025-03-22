from django.contrib import admin
from .models import (Offering, Rota, BibleVerse, GalleryItem, PrayerRequest, LiturgicalEvent, News,
                     VolunteerSlot, Stream, DirectoryEntry, Ministry, LectionaryReading, SermonNote, Feedback)

admin.site.register(Offering)
admin.site.register(Rota)
admin.site.register(BibleVerse)
admin.site.register(GalleryItem)
admin.site.register(PrayerRequest)
admin.site.register(LiturgicalEvent)
admin.site.register(News)
admin.site.register(VolunteerSlot)
admin.site.register(Stream)
admin.site.register(DirectoryEntry)
admin.site.register(Ministry)
admin.site.register(LectionaryReading)
admin.site.register(SermonNote)
admin.site.register(Feedback)
