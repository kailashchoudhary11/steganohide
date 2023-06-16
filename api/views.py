from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
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
            return Response(serializer.data)

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

        text = get_text(image, password)

        return Response(data={"secret_text": text})