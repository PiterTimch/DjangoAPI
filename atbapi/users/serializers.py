from rest_framework import serializers
from .models import CustomUser
import base64
from django.core.files.base import ContentFile
from PIL import Image
import io

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
                format, imgstr = avatar_data.split(";base64,")
                ext = format.split("/")[-1]
                img_bytes = base64.b64decode(imgstr)
            else:
                img_bytes = base64.b64decode(avatar_data)
                ext = "webp"

            img = Image.open(io.BytesIO(img_bytes))

            def save_resized(img_obj, size):
                img_copy = img_obj.copy()
                img_copy.thumbnail(size, Image.ANTIALIAS)
                temp_io = io.BytesIO()
                img_copy.save(temp_io, format=ext.upper())
                return ContentFile(temp_io.getvalue())

            user.image_small.save(f"{user.email}_small.{ext}", save_resized(img, (50, 50)), save=False)
            user.image_medium.save(f"{user.email}_medium.{ext}", save_resized(img, (150, 150)), save=False)
            user.image_large.save(f"{user.email}_large.{ext}", save_resized(img, (300, 300)), save=False)

            user.username = user.email
        user.save()
        return user