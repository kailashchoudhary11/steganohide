from django.urls import path
from .views import Endpoints, HideText, RevealText

app_name = 'api'

urlpatterns = [
    path('', Endpoints.as_view()),
    path('hide/', HideText.as_view(), name='hide-text'),
    path('reveal/', RevealText.as_view(), name='reveal-text'),
]
