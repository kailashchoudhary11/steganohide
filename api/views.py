from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ListUsers(APIView):
    def get(self, request):
        user = {
            "name": "kai", 
            "num": "11"
        }
        return Response(user)