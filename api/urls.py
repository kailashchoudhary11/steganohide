from django.urls import path
from .views import Endpoints, HideText, LoginUser, PasswordStorage, RegisterUser, RevealText 


app_name = 'api'

urlpatterns = [
    # Stegano features
    path('', Endpoints.as_view()),
    path('hide/', HideText.as_view(), name='hide-text'),
    path('reveal/', RevealText.as_view(), name='reveal-text'),

    # Auth
    path('register/', RegisterUser.as_view(), name='register_user'),
    path('login/', LoginUser.as_view(), name='login_user'),

    # Password Storage
    path('password_storage/', PasswordStorage.as_view(), name='password_storage'),
]
