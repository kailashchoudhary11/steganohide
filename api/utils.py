from stegano import lsb
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

def get_processed_image(raw_img, secret_text):
    with Image.open(raw_img) as img:
        img = img.convert('RGB')
        secret = lsb.hide(img, secret_text)
    img_io = BytesIO()
    secret.save(img_io, format="PNG", quality=100)
    image = ContentFile(img_io.getvalue(), raw_img.name)
    return image

def get_text(img):
    text = lsb.reveal(img)
    return text