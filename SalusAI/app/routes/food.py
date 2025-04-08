from flask import Blueprint, request, jsonify
import requests
from PIL import Image
from io import BytesIO
from app.services.food_service import get_food_name_from_image

food_bp = Blueprint('food', __name__)

@food_bp.route('/foodrecognition', methods=['POST'])
def recognize_food():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        response = requests.get(url)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        result = get_food_name_from_image(img)
        return jsonify({"food": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


