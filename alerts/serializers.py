from django.db.models.fields import EmailField
from rest_framework import serializers

from .models import ProductAlert

class AlertSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField('get_status')
    time_interval = serializers.SerializerMethodField('get_time_interval')
    class Meta:
        model = ProductAlert
        fields = ['id', 'title', 'status', 'time_interval', 'search_phrase', 'email']
    
    def get_status(self, obj):
        return obj.status.name
    
    def get_time_interval(self, obj):
        return obj.time_interval.name


class UserEmailSerializer(serializers.ModelSerializer):
     class Meta:
        model = ProductAlert
        fields = ['email']
    