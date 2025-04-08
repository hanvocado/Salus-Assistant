from google import genai
from google.genai import types
import json
import os  
import re 

model = genai.Client(api_key="AIzaSyCFjH9sPw5IKRMdNjRuxb3p_qYiEoWium8")


def markdown_to_json(markdown):
    # Sử dụng regex để tìm JSON trong markdown
    json_string = re.search(r'```json\n(.*?)\n```', markdown, re.DOTALL)
    
    if json_string:
        # Lấy chuỗi JSON từ markdown và loại bỏ dấu xuống dòng dư thừa
        json_data = json_string.group(1).strip()
        
        # Chuyển chuỗi JSON thành đối tượng Python
        try:
            parsed_json = json.loads(json_data)
            return parsed_json
        except json.JSONDecodeError as e:
            print("Lỗi trong quá trình giải mã JSON:", e)
            return None
    else:
        print("Không tìm thấy JSON trong markdown.")
        return None

def create_planning(data):
    # Convert profile to a dictionary
    pd = dict(data)
    food_preference = "chay" if pd.get("isVegetarian", False) else "Mặn"
    response = model.models.generate_content(
        contents=[
            f"""
            Hiện tại tôi đang {pd.get('age')}, cao {pd.get('height')}, Tôi là người ăn {food_preference} với khẩu vị ăn {pd.get('taste')},
            hoạt động thể thao cường độ {pd.                                                                                                                                                                                                                                                                                                                                             get('sportActivity')}/7 ngày. Tôi đang cân nặng {pd.get('weight')}.
            Hãy cung cấp cho tôi một lộ trình nạp dinh dưỡng phù hợp với tôi.
            Yêu cầu bạn trả cho tôi chỉ duy nhất json.
            Đây là những thông tin tôi cần cho json (Chỉ cần quan tâm đến key)
            Reason là nói về lý do chọn plan này
            """,
            """
            {
                "calories": 2000,
                "fat": 70,
                "sugar": 30,
                "protein": 50,
                "fiber": 25,
                "reason": ""
            }
            """
        ],
        config=types.GenerateContentConfig(
            system_instruction=(
                """
                Giả sử bạn là một chuyên gia dinh dưỡng Salus về ăn uống.
                Những tin nhắn này là của người khao khát muốn sức khỏe tốt hơn.
                Hãy nhắn tin giúp đỡ họ thật nhiệt tình nhé.
                """
            )
        ),
        model="gemini-2.0-flash"
    )
    return markdown_to_json(response.text)
