from django.db import models
from django.db.models import JSONField

from apps.alerts.models import ProductAlert


class ProductList(models.Model):
    """
        Model to save products list for a search phrase from ebay
    """
    alert = models.ForeignKey(ProductAlert, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    product_json = JSONField(null=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
    
    def __str__(self):
        return self.alert.search_phrase