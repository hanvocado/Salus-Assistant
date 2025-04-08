from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time, os, re
from azure.azure_helper import upload_img_by_url
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

    main_images_div = driver.find_element(By.ID, "rcnt")

    # Sometimes it raise SSL eror so I write code to pass and try another link
    images_holders = main_images_div.find_elements(By.CSS_SELECTOR, "img.YQ4gaf")
    url = None
    for holder in images_holders:
        try:
            holder.click() 
            time.sleep(5)
            url = driver.find_element(By.CSS_SELECTOR, "img.sFlh5c.FyHeAf.iPVvYb, img.sFlh5c.FyHeAf").get_attribute("src")
            if url is not None:
                break
        except Exception:
            pass

    return url

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

def clean_name(name):
    name_without_space = name.replace(' ', '_')
    name_with_word_only = re.sub(r'\W+', '', name_without_space)
    return name_with_word_only   

def upload_to_azure(row):
    cleaned_name = clean_name(row['food_name'])
    image_name = f'{cleaned_name}.jpg'
    azure_src = upload_img_by_url(image_name, row['img_src'])
    return azure_src

if __name__ == "__main__":
    food_list = scrape_food_info()
    print('Done scrape food info')
    for food in food_list:
        attempts = 3
        external_src = None
        while (external_src is None and attempts > 0):
            external_src = crawl_img_url(food['food_name'])
            attempts -= 1

        food['img_src'] = external_src

    food_df = pd.DataFrame(food_list)
    food_df['azure_img_src'] = food_df.apply(upload_to_azure, axis=1)
    save_as_csv(food_df)