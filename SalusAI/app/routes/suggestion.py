from flask import Blueprint, request, jsonify
from app.services.suggestion_service import get_suggestions

suggestion_bp = Blueprint('suggestion', __name__)
@suggestion_bp.route('/suggestion', methods=['POST'])
def suggestion():
    data = request.get_json()
    try:
        result = get_suggestions(data)
        return jsonify(result) , 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500