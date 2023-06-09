# for encryption and decryption
from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA512

# for hiding and revealing data in image
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
from stegano import lsb

BLOCK_SIZE = 32 # Bytes

data = b'hello world'
password = b"this is my password and it is so awesome"

# hide encrypted data in image
def get_processed_image(raw_img, secret_text):
    with Image.open(raw_img) as img:
        img = img.convert('RGB')
        secret = lsb.hide(img, secret_text)
    img_io = BytesIO()
    secret.save(img_io, format="PNG", quality=100)
    image = ContentFile(img_io.getvalue(), raw_img.name)
    return image

# get encrypted data from image
def get_text(img):
    text = lsb.reveal(img)
    return text

# get key from password
def get_key(password):
    salt = 'this is secret salt'
    key = PBKDF2(password, salt, 32, count=1000000, hmac_hash_module=SHA512)
    return key

# encrypt the data
def encrypt(data, password):
    key = get_key(password)
    cipher = AES.new(key, AES.MODE_ECB)
    cipher_text = cipher.encrypt(pad(data, BLOCK_SIZE))
    return cipher_text

# decrypt the encrypted data
def decrypt(enc_data, password):
    key = get_key(password)
    decipher = AES.new(key, AES.MODE_ECB)
    msg_dec = decipher.decrypt(enc_data)
    print(unpad(msg_dec, BLOCK_SIZE))
