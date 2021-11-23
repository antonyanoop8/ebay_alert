from django.urls import path, include
from apps.products import views



# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', views.ProductListView.as_view(), name='product-list'),
]