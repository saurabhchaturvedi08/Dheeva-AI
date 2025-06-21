from flask import Blueprint, request, jsonify
from app.services import embedding_service, llm_service

bp = Blueprint("chat", __name__, url_prefix="/api/chat")

@bp.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data["query"]
    file_id = data["file_id"]  # Assume file ID is tracked

    context = embedding_service.search_context(query, file_id)
    answer = llm_service.ask_with_context(query, context)

    return jsonify({"answer": answer})
