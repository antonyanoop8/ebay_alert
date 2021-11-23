import json

from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_enum_choices.fields import EnumChoiceField
from django_celery_beat.models import IntervalSchedule, PeriodicTask
from apps.alerts.enums import TimeInterval, SetupStatus
from django.contrib.auth.models import User


class ProductAlert(models.Model):
    """
        Model to save user alerts
    """
    title = models.CharField(max_length=70, blank=False)
    status = EnumChoiceField(SetupStatus, default=SetupStatus.active)
    created_at = models.DateTimeField(auto_now_add=True)
    time_interval = EnumChoiceField(
        TimeInterval, default=TimeInterval.ten_mins)
    task = models.OneToOneField(
        PeriodicTask,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    search_phrase = models.CharField(max_length=200, blank=True, null=True, unique=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = 'Product Alert'
        verbose_name_plural = 'Product Alerts'
    
    def __str__(self):
        return self.title
    
    def setup_task(self):
        """
            function creates periodic task to run for created alert
        """
        self.task = PeriodicTask.objects.create(
            name=self.title,
            task='fetch_product_prices_from_ebay',
            interval=self.interval_schedule,
            args=json.dumps([self.id]),
            start_time=timezone.now()
        )
        self.save()
    
    @property
    def interval_schedule(self):
        """
            function to create or fetch time intervals for 2, 10 and 30 minutes 
        """
        if self.time_interval == TimeInterval.two_mins:
            interval_schedule, created = IntervalSchedule.objects.get_or_create(every=2, period='minutes')
            return interval_schedule
        if self.time_interval == TimeInterval.ten_mins:
            interval_schedule, created = IntervalSchedule.objects.get_or_create(every=10, period='minutes')
            return interval_schedule
        if self.time_interval == TimeInterval.thirty_mins:
            interval_schedule, created = IntervalSchedule.objects.get_or_create(every=30, period='minutes')
            return interval_schedule
        raise NotImplementedError


@receiver(post_save, sender=ProductAlert)
def create_or_update_periodic_task(sender, instance, created, **kwargs):
    if created:
        instance.setup_task()
    else:
        if instance.task is not None:
            instance.task.enabled = instance.status == SetupStatus.active
            instance.task.save()