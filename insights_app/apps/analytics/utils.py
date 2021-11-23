from typing import Any

import requests
from django.conf import settings


def get_data(url) -> Any:
    resp = requests.get(f"{settings.USER_APP_URL}{url}")
    resp.raise_for_status()
    return resp.json()
