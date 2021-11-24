import json
import logging

from celery import shared_task
from ebaysdk.finding import Connection as Finding
from ebaysdk.exception import ConnectionError

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from .models import ProductAlert
from apps.products.models import ProductList

logger = logging.getLogger(__name__)


@shared_task(name="fetch_product_prices_from_ebay")
def fetch_product_prices_from_ebay(alert_id):
    try:
        product_alert = ProductAlert.objects.get(id=alert_id)
        # if settings.USE_PROD_EBAY:
        #     api = Finding(appid=settings.EBAY_APP_ID, config_file=None)
        # else:
        api = Finding(domain='svcs.sandbox.ebay.com', appid=settings.EBAY_APP_ID, config_file=None)
        response = api.execute('findItemsAdvanced', {'keywords': product_alert.search_phrase})
        logger.info("Ebay search data = %s" % json.dumps(response.json(), indent=4))
        data = json.loads(response.json())
        cheapest_price_products = sorted(
            data["searchResult"]["item"], key=lambda x: x["sellingStatus"]["currentPrice"]["value"], reverse=True
        )
        if len(cheapest_price_products) > 20:
            product = ProductList.objects.create(alert=product_alert, product_json=json.dumps(cheapest_price_products[:20]))
        else:
            product = ProductList.objects.create(alert=product_alert, product_json=json.dumps(cheapest_price_products))
        logger.info("Product list from ebay saved to db")
        mail_template = "mails/products.html"
        mail_body = render_to_string(mail_template, context={"data": cheapest_price_products})
        send_mail(
            subject="Ebay alerts", message="",
            html_message=mail_body, from_email=settings.DEFAULT_FROM_EMAIL, 
            recipient_list=[product_alert.email]
            )
        logger.info("Email alert to user with cheapest 20 products send")
    except ConnectionError as e:
        logger.error(str(e), exc_info=True)