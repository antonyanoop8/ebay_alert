from typing import Union

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from pandas import DataFrame, to_datetime

from django.template.loader import render_to_string
import logging

from apps.analytics.utils import get_data

logger = logging.getLogger(__name__)


@shared_task
def send_insights_to_user(mail,  data):

    mail_template = "mails/insights.html"
    mail_body = render_to_string(mail_template, context={"data": data})
    send_mail(subject="Ebay insights alerts", message="",html_message=mail_body, from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[mail])


@shared_task
def generate_insights_for_user(user_email):

    logger.info(f"Generating insights for {user_email}")
    resp = get_data(f"products/?email={user_email}&no_of_days={settings.INSIGHT_DAYS}")

    if not resp:
        logger.info(f"No data found for {user_email}")
        return

    data = DataFrame(resp)
    data['created_date'] = to_datetime(data['created_date'], format="%y/%m/%d")
    # group by item_id
    grouped_df = data.groupby("item_id", sort=True)
    product_info = []

    for idx, df in grouped_df:
        #code to find drop in price
        sorted_df = df.sort_values(by=['created_date'])
        historical_price_avg = sorted_df[:-1]['price'].mean()
        latest_product_df = sorted_df[-1:].iloc[0]
        latest_price = latest_product_df.price
        price_drop_percentage = ((historical_price_avg - latest_price)/historical_price_avg) * 100

        if price_drop_percentage > settings.PRICE_DROP_THRESHOLD:
            product_info.append({'product_name': latest_product_df.product_name, "latest_price": float(latest_price), "price_drop":float(round(price_drop_percentage, 2))})

    if product_info:
        # call celery task to call send mail
        send_insights_to_user.delay(user_email, product_info)
        logger.info(f"sending product insights to {user_email}, with products:{product_info}")


@shared_task
def collect_users_data():
    resp = get_data("alerts/user-emails")
    for email in resp:
        generate_insights_for_user.delay(email.get("email"))

