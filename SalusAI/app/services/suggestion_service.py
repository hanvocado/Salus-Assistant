from google import genai
from google.genai import types
import json
import os
from app.services.planning_service import markdown_to_json


model = genai.Client(api_key="AIzaSyCFjH9sPw5IKRMdNjRuxb3p_qYiEoWium8")


def get_suggestions(data):
    pd = dict(data)
    # Load food descriptions from food_description.json
    food_description_path = os.path.join(os.path.dirname(__file__), "food_description.json")
    with open(food_description_path, "r", encoding="utf-8") as file:
        food_descriptions = json.load(file)
    response = model.models.generate_content(
        contents=[
            f"""
            Tôi muốn bạn gợi ý giúp tôi các món ăn ngày hôm nay phù hợp cho người đang có nhu cầu nạp 
            {pd.get('calories')} calories, 
            {pd.get('fat')} gam béo, 
            {pd.get('sugar')} gam đường, 
            {pd.get('protein')} gam đạm, 
            {pd.get('fiber')} gam chất xơ.
            Trả về cho tôi 1 list số thứ tự của các món ăn trong plan ngày hôm nay (5-6 món).
            Định dạng trả về 
            JSON 
            1 Key "Foods":[<Số thứ tự>,<Số thứ tự>,...]
            Chỉ trả về duy nhất các số thôi, không đuợc làm gì thêm
            """  
        ],
        config=types.GenerateContentConfig(
        system_instruction=(
            food_descriptions
        )
        ),
        model="gemini-2.0-flash"
    )
    return markdown_to_json(response.text)