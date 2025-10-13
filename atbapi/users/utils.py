from PIL import Image
import uuid
import requests
import io
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

def download_image_as_file(url: str, timeout: int = 10, max_size: int = 5 * 1024 * 1024) -> io.BytesIO:
    try:
        resp = requests.get(url, stream=True, timeout=timeout)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise ValueError(f"Не вдалося завантажити з URL: {e}")

    content_type = resp.headers.get("Content-Type", "")
    if not content_type.startswith("image/"):
        raise ValueError(f"URL не містить зображення (Content-Type={content_type})")

    buf = io.BytesIO()
    total = 0
    for chunk in resp.iter_content(chunk_size=8192):
        if not chunk:
            continue
        total += len(chunk)
        if total > max_size:
            raise ValueError(f"Розмір зображення перевищує ліміт {max_size} байт")
        buf.write(chunk)

    buf.seek(0)
    return buf