from django.db import models

# Create your models here.
class SecretInfo(models.Model):
    img = models.ImageField(upload_to="img")
    created = models.DateTimeField(auto_now_add=True)
    
