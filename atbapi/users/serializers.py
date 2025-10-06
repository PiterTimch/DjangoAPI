from rest_framework import serializers
from .models import CustomUser
import base64
from django.core.files.base import ContentFile
from PIL import Image
import io
import uuid

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

        print(avatar_data)

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
                temp_io = io.BytesIO()
                img_copy.save(temp_io, format="WEBP", quality=85)
                return ContentFile(temp_io.getvalue(), name=random_name)

            user.image_small.save(f"{random_name}_small.webp", save_resized(img, (50, 50), "small"), save=False)
            user.image_medium.save(f"{random_name}_medium.webp", save_resized(img, (150, 150), "medium"), save=False)
            user.image_large.save(f"{random_name}_large.webp", save_resized(img, (300, 300), "large"), save=False)

        user.username = user.email
        user.save()
        return user
