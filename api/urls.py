from django.urls import path
from .views import Endpoints, HideText, RevealText, RegisterUser, CookieTokenRefreshView, CookieTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'api'

urlpatterns = [
    # Stegano features
    path('', Endpoints.as_view()),
    path('hide/', HideText.as_view(), name='hide-text'),
    path('reveal/', RevealText.as_view(), name='reveal-text'),

    # Auth
    path('register/', RegisterUser.as_view(), name='register_user'),

    # JWT Authentication
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]
