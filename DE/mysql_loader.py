import mysql.connector
import time
from azure_helper import get_csv_df

food_table = 'food'
cursor = None

def connect_to_mysql():
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
    return conn

def create_table():
    cursor.execute(
        f'''
        CREATE TABLE IF NOT EXISTS {food_table} (
            id INT PRIMARY KEY,
            food_name VARCHAR(50),
            serving_size VARCHAR(50),
            calories INT,
            fat FLOAT,
            sugar FLOAT,
            protein FLOAT,
            fiber FLOAT,
            image_url VARCHAR(255)
        )
        '''
    )

def insert_food_data():
    cursor.execute(f"SELECT COUNT(*) FROM {food_table}")
    df = get_csv_df('data', 'food_data.csv')
    if cursor.fetchone()[0] == 0:
        for i, row in df.iterrows():
            cursor.execute(
                f'''
                INSERT INTO {food_table} (id, food_name, serving_size, calories, fat, sugar, protein, fiber, image_url) VALUES
                ("{i+3}", "{row['food_name']}", "{row['serving_size']}", {row['calories']}, 
                {row['fat']}, {row['sugar']}, {row['protein']}, {row['fiber']}, "{row['azure_img_src']}")
                '''
            )
            print(f'Insert {i + 1} rows')

if __name__ == "__main__":
    conn = connect_to_mysql()
    cursor = conn.cursor()
    create_table()
    insert_food_data()
    conn.commit()
    cursor.close()
    conn.close()
