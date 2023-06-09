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

# hide data in image
def get_processed_image(raw_img, secret_text, password):
    with Image.open(raw_img) as img:
        img = img.convert('RGB')
        enc_text = encrypt(secret_text, password).decode('latin1')
        secret = lsb.hide(img, enc_text)
    img_io = BytesIO()
    secret.save(img_io, format="PNG", quality=100)
    image = ContentFile(img_io.getvalue(), raw_img.name)
    return image

# get data from image
def get_text(image, password):
    enc_text = lsb.reveal(image).encode('latin1')
    secret_data = decrypt(enc_text, password)
    return secret_data

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
    return unpad(msg_dec, BLOCK_SIZE).decode('utf-8')
