from datetime import datetime

from pydantic import BaseModel, validator


class Product(BaseModel):

    product_name: str
    product_url: str
    rate: float
    created_date: datetime

    @validator("product_url")
    def validate_url(cls, v):
        # TODO: add logic for validating URL
        return v
