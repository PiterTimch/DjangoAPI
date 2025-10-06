from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    image_small = models.CharField(max_length=255, blank=True, null=True)
    image_medium = models.CharField(max_length=255, blank=True, null=True)
    image_large = models.CharField(max_length=255, blank=True, null=True)

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.email