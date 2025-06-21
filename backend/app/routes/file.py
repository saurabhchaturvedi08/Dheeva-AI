from flask import Blueprint, request, jsonify
from app.services import ocr_service, whisper_service, embedding_service
from app.utils.file_utils import save_file, extract_text_from_pdf

bp = Blueprint("file", __name__, url_prefix="/api/file")

@bp.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    file_type = file.content_type
    filename = save_file(file)

    if "pdf" in file_type:
        text = extract_text_from_pdf(filename)
    elif "image" in file_type:
        text = ocr_service.process_image(filename)
    elif "audio" in file_type or "video" in file_type:
        text = whisper_service.transcribe(filename)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    embedding_service.create_embedding(text, filename)

    return jsonify({"message": "File processed successfully"})
