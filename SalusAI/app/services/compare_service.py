from google import genai
from google.genai import types
from flask import jsonify

model = genai.Client(api_key="AIzaSyCFjH9sPw5IKRMdNjRuxb3p_qYiEoWium8")

def compare_previous_plan(data):
    act = data.get('plan', {})
    real = data.get('real', {})
    response = model.models.generate_content(
        contents=[
            f"""
            Theo lịch dự kiến, tôi sẽ phải nạp {act.get('calories')} calo, hấp thụ {act.get('fat')}g chất béo,
            {act.get('sugar')}g đuờng, {act.get('protein')}g protein, {act.get('fiber')}g chất xơ.
            Nhưng thực tế, tôi đã nạp {real.get('calories')} calo, hấp thụ {real.get('fat')}g chất béo,
            {real.get('sugar')}g đuờng, {real.get('protein')}g protein, {real.get('fiber')}g chất xơ.
            Từ dữ kiện này, đưa ra giúp tôi một vài nhận xét và lời khuyên nhé.
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
    return response.text


# {
#     "plan": {
#       "calories": 1500,
#       "fat": 50,
#       "sugar": 25,
#       "protein": 80,
#       "fiber": 30
#     },
#     "real": {
#       "calories": 1082,
#       "fat": 27,
#       "sugar": 100,
#       "protein": 43,
#       "fiber": 6
#     }
#   }