from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField

from alerts.models import ProductAlert


class ProductList(models.Model):
    alert = models.ForeignKey(ProductAlert, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    product_json = JSONField(null=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
    
    def __str__(self):
        return self.alert.search_phrase