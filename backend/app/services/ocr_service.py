from PIL import Image
import pytesseract

def process_image(image_path):
    image = Image.open(image_path)
    return pytesseract.image_to_string(image)
