import os
import fitz  # PyMuPDF

UPLOAD_FOLDER = "uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_file(file):
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)
    return path

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    return "\n".join([page.get_text() for page in doc])
