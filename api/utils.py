from stegano import lsb
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

def get_processed_image(raw_img):
    with Image.open(raw_img) as img:
        img = img.convert('RGB')
        secret = lsb.hide(img, "Hello World")
    img_io = BytesIO()
    secret.save(img_io, format="PNG", quality=100)
    image = ContentFile(img_io.getvalue(), raw_img.name)
    return image