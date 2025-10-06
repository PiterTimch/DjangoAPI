from rest_framework import serializers
from .models import CustomUser
import base64
from PIL import Image
import io
import uuid
import os
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image_small', 'image_medium', 'image_large']

class RegisterSerializer(serializers.ModelSerializer):
    avatar = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "password", "avatar"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        avatar_data = validated_data.pop("avatar", None)
        password = validated_data.pop("password")
        user = CustomUser(**validated_data)
        user.set_password(password)

        if avatar_data:
            if avatar_data.startswith("data:image"):
                _, imgstr = avatar_data.split(";base64,")
                img_bytes = base64.b64decode(imgstr)
            else:
                img_bytes = base64.b64decode(avatar_data)

            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
            random_name = f"{uuid.uuid4().hex}.webp"

            def save_resized(img_obj, size, suffix):
                img_copy = img_obj.copy()
                img_copy.thumbnail(size, Image.LANCZOS)
                filename = f"{suffix}_{random_name}"
                filepath = os.path.join(settings.MEDIA_ROOT, "images", filename)
                os.makedirs(os.path.dirname(filepath), exist_ok=True)
                img_copy.save(filepath, format="WEBP", quality=85)
                return filename  # тільки назва для БД

            user.image_small = save_resized(img, (50, 50), "small")
            user.image_medium = save_resized(img, (150, 150), "medium")
            user.image_large = save_resized(img, (300, 300), "large")

        user.username = user.email
        user.save()
        return user
