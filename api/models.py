from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class SecretInfo(models.Model):
    img = CloudinaryField('image')
    created = models.DateTimeField(auto_now_add=True)
    
