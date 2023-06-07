from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SecretInfo
from .serializers import SecretInfoSerializer
from .utils import get_processed_image


# Create your views here.

class HideImage(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        infos = SecretInfo.objects.all()
        serializer = SecretInfoSerializer(infos, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        image = get_processed_image(request.FILES.get('img'))
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