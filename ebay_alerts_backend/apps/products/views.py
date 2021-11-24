import logging

from django.http import Http404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ProductList
from .utils import refactor_product_data_for_phase2

logger = logging.getLogger(__name__)


class ProductListView(APIView):
    """
        API to get all products depending on the email and no of days and send it to phase2
        ---
        parameters:
            - name: email
            - name: no_of_days
    """
    def get(self, request, format=None):
        try:
            if request.GET.get('email', None) and request.GET.get('no_of_days', None):
                current_date_time = timezone.now()
                last_date_time_to_check = current_date_time - timezone.timedelta(days=int(request.GET.get('no_of_days')))
                products = ProductList.objects.filter(
                    alert__email=request.GET.get('email'), 
                    created_at__gte=last_date_time_to_check, created_at__lte=current_date_time
                )
                return Response(refactor_product_data_for_phase2(products))
            else:
                logger.info("No products found")
                raise Http404
        except Exception as e:
            logger.error(str(e), exc_info=True)
            raise Http404
