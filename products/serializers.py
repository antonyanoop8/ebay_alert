from rest_framework import serializers

from products.models import ProductList


class ProductListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductList
        fields = "__all__"