from rest_framework import serializers
from .models import SecretInfo

class SecretInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretInfo
        fields = "__all__"