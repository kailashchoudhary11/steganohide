from django.urls import path
from .views import Endpoints, HideImage

urlpatterns = [
    path('', Endpoints.as_view()),
    path('hide/', HideImage.as_view(), name='hide-img')
]
