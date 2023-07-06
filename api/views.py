from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import SecretInfo
from .serializers import SecretInfoSerializer
from .utils import get_processed_image, get_text

class HideText(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        infos = SecretInfo.objects.all()
        serializer = SecretInfoSerializer(infos, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        raw_img = request.FILES.get('image')
        secret_msg = request.data.get('secret_text').encode('utf8')
        password = request.data.get('password').encode('utf8')
        
        image = get_processed_image(raw_img, secret_msg, password)
        data = {"img": image}

        serializer = SecretInfoSerializer(data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            augmented_serializer_data = dict(serializer.data)
            augmented_serializer_data['name'] = raw_img.name
            return Response(augmented_serializer_data)

        return Response(serializer.errors)

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
        except Exception:
            return Response(data={'error': 'Incorrect Password'}, status=status.HTTP_401_UNAUTHORIZED)