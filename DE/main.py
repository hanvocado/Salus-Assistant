from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time, os
from azure_helper import upload_img_by_url
from dotenv import load_dotenv
import pandas as pd

load_dotenv()
azure_url = os.getenv('AZURE_STORAGE_URL')

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=chrome_options)
driver.implicitly_wait(10)

def crawl_img_url(item):
    print(f"Searching image for: {item}")
    driver.get("https://images.google.com/")
    search_box = driver.find_element(By.NAME, "q")
    search_box.clear()
    search_box.send_keys(item)
    search_box.send_keys(Keys.RETURN)
    time.sleep(2)

    try:
        main_images_div = driver.find_element(By.ID, "rcnt")
        main_images_div.find_element(By.CSS_SELECTOR, "img.YQ4gaf").click()
        time.sleep(6)
        url = driver.find_element(By.CSS_SELECTOR, "img.sFlh5c.FyHeAf.iPVvYb").get_attribute("src")
        return url
    except Exception as e:
        print(f"Error find {item} image url: {e}")

def scrape_food_info():
    url = os.getenv('FOOD_NUTRITION_WEBSITE')
    driver.get(url)
    rows = driver.find_elements(By.CLASS_NAME, 'row-render')
    food_list = []
    for row in rows:
        properties = row.find_elements(By.TAG_NAME, 'td')

        food = {
            'food_name': properties[0].text.strip(),
            'serving_size': properties[1].text.strip(),
            'calories': properties[2].text.strip(),
            'fat': properties[3].text.strip(),
            'sugar': properties[4].text.strip(),
            'protein': properties[5].text.strip(),
            'fiber': properties[6].text.strip()
        }
        food_list.append(food)

    return food_list

def save_as_csv(list_of_item):
    df = pd.DataFrame(list_of_item)
    df.to_csv('food_data.csv', index=False)

if __name__ == "__main__":
    food_list = scrape_food_info()
    for food in food_list:
        food_name = food['food_name']
        external_src = crawl_img_url(food_name)
        image_name = f"{food_name.replace(' ', '_')}.jpg"
        azure_src = upload_img_by_url(image_name, external_src)
        food['img_src'] = azure_src
    
    save_as_csv(food_list)