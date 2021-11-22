import json

def refactor_product_data_for_phase2(products):
    data = []
    for product in products:
        product_json = json.loads(product.product_json)
        for ebay_data in product_json:
            data.append({
                "product_name": ebay_data["title"],
                "created_date": product.created_at.strftime("%y/%m/%d"),
                "itemid": ebay_data["itemId"],
                "price": ebay_data["sellingStatus"]["currentPrice"]["value"]
            })
    return json.dumps(data)