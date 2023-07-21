from .models import SecuredPasswordStorage
from .serializers import SecureStorageSerializer, UserSerializer
from .utils import get_processed_image, get_text, get_key

from django.http import FileResponse
from django.conf import settings
from django.contrib.auth import authenticate, login

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

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
            request.session["enc_key"] = str(get_key(username + password))
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
    # permission_classes = [IsAuthenticated, ]

    def get(self, request):
        
        saved_passwords = SecuredPasswordStorage.objects.filter(user=request.user)
        serializer = SecureStorageSerializer(saved_passwords, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        raw_img = request.FILES.get('image')
        secret_msg = request.data.get('password').encode('utf8')
        password = "test".encode('utf8')
        
        print("processinnnng image")
        print(raw_img)
        image = get_processed_image(raw_img, secret_msg, password)
        print("image processed")

        service = request.data.get('service')
        username = request.data.get('username')
        data = {"image": image, "user": request.user, "service": service, "username": username, "password": password}

        serializer = SecureStorageSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response("Password Stored Successfully")

        return Response(serializer.errors)