from flask import Blueprint, request, jsonify
from app.services import search_service

bp = Blueprint("search", __name__, url_prefix="/api/search")

@bp.route("/ask", methods=["POST"])
def realtime_ask():
    query = request.json["query"]
    answer = search_service.query_web(query)
    return jsonify({"answer": answer})
