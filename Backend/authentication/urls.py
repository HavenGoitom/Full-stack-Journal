from django.urls import path
from .views import SignUpView, LogoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),        
    path("signin/", TokenObtainPairView.as_view(), name="signin"), 
    path("logout/", LogoutView.as_view(), name="logout"),         
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
