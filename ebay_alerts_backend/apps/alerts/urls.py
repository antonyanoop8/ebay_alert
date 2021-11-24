from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.alerts import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'', views.UserPriceAlertView)

urlpatterns = [
    path('', include(router.urls)),
    path('user-emails', views.UserEmailListView.as_view(), name="user-emails-list")
]