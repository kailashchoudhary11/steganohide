from django.urls import path
from .views import Endpoints, HideText, LoginUser, RegisterUser, RevealText, SecuredPasswordStorageView, SinglePasswordView
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
    path('password_storage/', SecuredPasswordStorageView.as_view(), name='password_storage'),
    path('single_password/<int:id>/', SinglePasswordView.as_view(), name='single_password'),
]
