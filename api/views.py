from .models import SecuredPasswordStorage
from .serializers import PasswordRevealSerializer, SecureStorageSerializer, UserSerializer
from .utils import get_processed_image, get_text, get_key

from django.http import FileResponse
from django.conf import settings
from django.contrib.auth import authenticate, login

import requests

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

import urllib.request

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "User Created"})
        errors = dict(serializer.errors)
        return Response({"errors": errors})

class LoginUser(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            request.session["enc_key"] = get_key(username + password).decode("latin1")
            return Response({"message": "Logged in successfully"})

        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class HideText(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        raw_img = request.FILES.get('image')
        secret_msg = request.data.get('secret_text').encode('utf8')
        password = request.data.get('password').encode('utf8')
        
        image = get_processed_image(raw_img, secret_msg, password)
        data = {"img": image}

        response = FileResponse(image)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = 'attachment; filename="foo.jpeg"'
        return response

class Endpoints(APIView):
    def get(self, request):
        endpoints = ['/hide', '/reveal']
        return Response(endpoints)

class RevealText(APIView):
    parser_classes = (FormParser, MultiPartParser)

    def post(self, request):
        image = request.FILES.get('image')
        password = request.data.get('password').encode('utf8')
        try:
            text = get_text(image, password)
            return Response(data={"secret_text": text})
        except Exception as e:
            error_msg = ''
            error = str(e)
            if 'detect' in error.lower():
                error_msg = 'The Image Does Not Contain Hidden Text'
            else:
                error_msg = 'Incorrect Password'
                
            return Response(data={'error': error_msg}, status=status.HTTP_401_UNAUTHORIZED)

class SecuredPasswordStorageView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        
        saved_passwords = SecuredPasswordStorage.objects.filter(user=request.user).order_by("-updated")
        serializer = PasswordRevealSerializer(saved_passwords, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        raw_img = request.FILES.get('image')
        secret_msg = request.data.get('password').encode('utf8')
        key = request.session.get("enc_key").encode("latin1")
        print(raw_img)
        image = get_processed_image(raw_img, secret_msg, key=key)

        service = request.data.get('service')
        username = request.data.get('username')
        data = {"image": image, "user": request.user.id, "service": service, "username": username}

        serializer = SecureStorageSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response("Password Stored Successfully")

        return Response(serializer.errors)

class SinglePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        print("View called")
        saved_password = SecuredPasswordStorage.objects.get(id=id)
        
        cloudinary.api
       
        print(image)
        text = get_text(image, key = request.session.get("enc_key").encode("latin1"))
        print(text)
        return Response({"data": text})
        # except Exception as e:
        #     print(e)
        return Response({"error": "Unable to Reveal the Password"})