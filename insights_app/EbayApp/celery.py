import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "EbayApp.settings")
BASE_REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379')

app = Celery("EbayApp")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.broker_url = BASE_REDIS_URL
# Load task modules from all registered Django apps.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "collect_users_for_insights":{
        "task": "apps.analytics.tasks.collect_users_data",
        "schedule": crontab(minute=1),
}
}