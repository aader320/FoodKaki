import sys
import requests
from bs4 import BeautifulSoup
import json
import time
import os

def fetch_initial_data(search_query):
    base_url = "https://food.grab.com/sg/en/restaurants"
    params = {
        'lng': 'en',
        'search': search_query,
        'support-deeplink': 'true',
        'searchParameter': search_query
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }
    response = requests.get(base_url, headers=headers, params=params)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        script_tag = soup.find('script', id='__NEXT_DATA__')
        if script_tag:
            script_content = script_tag.string.strip()
            data = json.loads(script_content)
            return data
    return None

# Step 2: Parse Data to Get Restaurant List
def parse_data(data):
    restaurant_list = data.get("props", {}).get("initialReduxState", {}).get("pageRestaurantsV2", {}).get("collections", {}).get("restaurantList", {})
    first_key = next(iter(restaurant_list))

    # Extract the list which is 2 layers down
    clean_data = restaurant_list[first_key]
    # print(clean_data)
    return clean_data

def fetch_detailed_responses(ids):
    url_template = "https://portal.grab.com/foodweb/v2/merchants/{}"
    all_data = []

    count = 0
    for merchant_id in ids:
        if count >= 5:
            break
        url = url_template.format(merchant_id)
        response = requests.get(url)
        merchant_info = response.json().get("merchant", {})

        name = merchant_info.get("name")
        menu = merchant_info.get("menu")
        categories = menu.get("categories")
        # List to hold all food items
        food_items = []
        # Iterate through each category
        for category in categories:
            items = category.get("items", [])
            
            # Iterate through each item in the category
            for item in items:
                food_item = {
                    "name": item.get("name"),
                    "priceInMinorUnit": item.get("priceInMinorUnit"),
                    "imgHref": item.get("imgHref")
                }
                food_items.append(food_item)
        filtered_food_items = [food for food in food_items if sys.argv[1].lower() in food["name"].lower()]

        cuisine = merchant_info.get("cuisine")
        all_data.append({"ID": merchant_id, "Details": {"Name": name, "Cuisine": cuisine, "Food":filtered_food_items}})
        count = count + 1
        time.sleep(1)
    return all_data

def main():
    search_query = sys.argv[1] if len(sys.argv) > 1 else "nasi lemak"  # Default search query
    initial_data = fetch_initial_data(search_query)
    if initial_data:
        restaurant_ids = parse_data(initial_data)
        detailed_data = fetch_detailed_responses(restaurant_ids)
        print(json.dumps(detailed_data))
    else:
        print("Failed to fetch initial data")

if __name__ == "__main__":
    main()
