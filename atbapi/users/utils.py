from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile
import requests
from django.conf import settings

def compress_image(image_field, size=(800,800), quality=85):
    image = Image.open(image_field).convert('RGB')

    image.thumbnail(size, Image.LANCZOS)

    uid = str(uuid.uuid4())[:10]
    image_name=f'{uid}.webp'

    image_path = settings.AVATARS_ROOT / image_name
    image.save(image_path, format='WEBP', quality=quality)

    return image_name

def verify_recaptcha(token):
    secret_key = settings.RECAPTCHA_SECRET_KEY
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": secret_key,
        "response": token
    }
    response = requests.post(url, data=payload)
    result = response.json()

    print(result)

    return result