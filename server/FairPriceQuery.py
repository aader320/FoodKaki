import requests
import sys
import json

def fetch_item_data(item_name):
    base_url = "https://website-api.omni.fairprice.com.sg/api/layout/search/v2"
    params = {
        "algopers": "prm-ppb-1,prm-ep-1,t-epds-1,t-ppb-0,t-ep-0",
        "experiments": "searchVariant-B,timerVariant-Z,substitutionBSVariant-B,gv-A,shelflife-B,ds-A,SDND_delivery_reason-C,ls_comsl-B,ls_deltime-ogA,ls_deltime-feA,cartfiller-a,catnav-show,catbubog-B,sbanner-A,count-b,cam-a,priceperpiece-b,ls_deltime-sortA,promobanner-c,algopers-b,dlv_pref_mf-B,delivery_pref_ffs-A,delivery_pref_pfc-A,crtalc-B,rec-wtyl-ds,rec-fbt-ds",
        "includeTagDetails": "true",
        "orderType": "DELIVERY",
        "q": item_name
    }

    session = requests.Session()
    request = requests.Request('GET', base_url, params=params)
    prepped = session.prepare_request(request)
    
    # print(f"Debug: Complete URL - {prepped.url}")
    
    response = session.send(prepped)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data, status code: {response.status_code}"}

def extract_product_data(json_data):
    try:
        layouts = json_data["data"]["page"]["layouts"]
        if len(layouts) > 2:
            products = layouts[2]["value"]["collection"]["product"]
        elif len(layouts) > 1:
            products = layouts[1]["value"]["collection"]["product"]
        else:
            return []

        extracted_data = []
        
        for product in products:
            item_data = {
                "Name": product.get("metaData", {}).get("SAP Product Name"),
                "Price": product.get("final_price"),
                "Image": product.get("images")[0]
            }
            extracted_data.append(item_data)
        
        return extracted_data
    except (KeyError, IndexError) as e:
        return []

if __name__ == "__main__":
    search_query = sys.argv[1] if len(sys.argv) > 1 else "chocolate"  # Default search query
    data = fetch_item_data(search_query)
    extracted_data = extract_product_data(data)
    print(json.dumps(extracted_data))


