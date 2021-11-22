from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import AlertSerializer, UserEmailSerializer
from .models import ProductAlert


class UserPriceAlertView(viewsets.ModelViewSet):

    queryset = ProductAlert.objects.all()
    serializer_class = AlertSerializer
    # permission_classes = (IsAuthenticated,)


class UserEmailListView(APIView):
    def get(self, request, format=None):
        emails = ProductAlert.objects.all()
        serializer = UserEmailSerializer(emails, many=True)
        return Response(serializer.data)