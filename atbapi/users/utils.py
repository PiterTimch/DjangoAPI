from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile

def compress_image(image_field, size=(800,800), quality=85):
    image = Image.open(image_field).convert('RGB')

    image.thumbnail(size, Image.LANCZOS)

    uid = str(uuid.uuid4())[:10]
    image_name=f'{uid}.webp'

    output = io.BytesIO()

    image.save(output, format='WEBP', quality=quality)

    output.seek(0)

    optimized_image = ContentFile(output.getvalue())

    return optimized_image, image_name