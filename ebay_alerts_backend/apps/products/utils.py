import logging
import json

logger = logging.getLogger(__name__)


def refactor_product_data_for_phase2(products):
    data = []
    for product in products:
        product_json = json.loads(product.product_json)
        for ebay_data in product_json:
            data.append({
                "product_name": ebay_data["title"],
                "created_date": product.created_at.strftime("%y/%m/%d"),
                "item_id": ebay_data["itemId"],
                "price": float(ebay_data["sellingStatus"]["currentPrice"]["value"])
            })
    logger.info(f"product list  = {data}")
    return data