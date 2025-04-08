from flask import Blueprint, request, jsonify
import requests
from PIL import Image
from io import BytesIO
from app.services.compare_service import compare_previous_plan

compare_bp = Blueprint('compare', __name__)
@compare_bp.route('/compare', methods=['POST'])
def compare():
    data = request.get_json()
    try:
        result = compare_previous_plan(data)
        # Assuming the function returns a JSON response
        return jsonify({"message": result}) , 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500