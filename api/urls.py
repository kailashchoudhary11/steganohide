from django.urls import path
from .views import Endpoints, HideText, RevealText
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'api'

urlpatterns = [
    path('', Endpoints.as_view()),
    path('hide/', HideText.as_view(), name='hide-text'),
    path('reveal/', RevealText.as_view(), name='reveal-text'),

    # JWT Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
