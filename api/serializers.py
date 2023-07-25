from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import SecuredPasswordStorage
from cloudinary.models import CloudinaryField
from cloudinary.uploader import upload

class SecureStorageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = SecuredPasswordStorage
        fields = "__all__"
    
    def create(self, validated_data):
        print("Creating...")
        image = validated_data.pop('image')
        result = upload(image)
        validated_data['image'] = result['url']
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = instance.image
        return data

class PasswordRevealSerializer(serializers.ModelSerializer):
    image = serializers.CharField()

    class Meta:
        model = SecuredPasswordStorage
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user