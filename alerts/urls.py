from django.urls import path, include
from rest_framework.routers import DefaultRouter
from alerts import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'', views.UserPriceAlertView)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('user-emails', views.UserEmailListView.as_view, name="user-emails-list")
]