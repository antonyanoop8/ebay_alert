from rest_framework import serializers

from .models import ProductList


class ProductListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductList
        fields = "__all__"