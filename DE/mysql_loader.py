import pandas as pd
import mysql.connector
import time

for i in range(1, 11):
    try:
        conn = mysql.connector.connect(
            host='mysql', user='root', password='root', database='salus'
        )
        print('Connected to MySQL')
        break
    except:
        print(f"Retrying {i} times ...")
        time.sleep(3)

df = pd.read_csv('/app/food_data.csv')
cursor = conn.cursor()

food_table = 'food'

cursor.execute(
    f'''
    CREATE TABLE IF NOT EXISTS {food_table} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(50),
        serving_size VARCHAR(50),
        calories INT,
        fat FLOAT,
        sugar FLOAT,
        protein FLOAT,
        fiber FLOAT,
        img_url VARCHAR(255)
    )
    '''
)

cursor.execute(f'TRUNCATE TABLE {food_table}')

for _, row in df.iterrows():
    cursor.execute(
        f'''
        INSERT INTO {food_table} (food_name, serving_size, calories, fat, sugar, protein, fiber, img_url) VALUES
        ("{row['food_name']}", "{row['serving_size']}", {row['calories']}, 
        {row['fat']}, {row['sugar']}, {row['protein']}, {row['fiber']}, "{row['azure_img_src']}")
        '''
    )

conn.commit()
cursor.close()
conn.close()
