from flask import Blueprint, request, jsonify
import requests
from PIL import Image
from io import BytesIO
from app.services.planning_service import create_planning


planning_bp = Blueprint('planning',__name__)

@planning_bp.route('/planning', methods=['POST'])
def planning():
    data = request.get_json()
    try:
        result = create_planning(data)
        return result
    except Exception as e:
        return jsonify({"error": str(e)}), 500    
