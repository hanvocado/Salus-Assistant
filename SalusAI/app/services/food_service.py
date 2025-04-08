from google import genai
from google.genai import types
import json
import os  

model = genai.Client(api_key="AIzaSyCFjH9sPw5IKRMdNjRuxb3p_qYiEoWium8")


def get_food_name_from_image(image):
    try:
        # Get the current directory of the script
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # Construct the full path to food_name.json
        file_path = os.path.join(current_dir, 'food_name.json')
        with open(file_path, 'r') as file:
            food_names = json.load(file)
    except FileNotFoundError:
        raise FileNotFoundError("The file 'food_name.json' was not found. Ensure it exists in the script's directory.")
    except json.JSONDecodeError:
        raise ValueError("The file 'food_name.json' contains invalid JSON. Please check its content.")
    response = model.models.generate_content(
        contents=[
            "Dựa vào hình ảnh này hãy xác định nó thuộc gần giống nhất với món ăn nào ? và hãy in ra duy nhất chỉ số của nó theo dạng: <Số thứ tự của nó> ",
            image
        ],
        config=types.GenerateContentConfig(
            system_instruction=food_names),
        model="gemini-2.0-flash"
    )
    return response.text
