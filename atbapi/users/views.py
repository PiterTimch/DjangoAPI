import random
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

from rest_framework import viewsets, status, parsers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .utils import verify_recaptcha
import requests
from urllib.parse import urlparse
from django.core.files.base import ContentFile

from .models import CustomUser
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    PasswordResetRequestSerializer,
    SetNewPasswordSerializer,
    CustomTokenObtainPairSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView

from .utils import compress_image
from django.core.files.temp import NamedTemporaryFile

FIRST_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Lee"]
DOMAINS = ["example.com", "test.com", "mail.com"]


def generate_random_users(n=5):
    created_users = []

    for _ in range(n):
        while True:
            username = f"user{random.randint(1000, 9999)}"
            if not CustomUser.objects.filter(username=username).exists():
                break

        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(DOMAINS)}"

        user = CustomUser.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        created_users.append(user)

    return created_users


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    @action(detail=False, 
            methods=["post"])
    def generate(self, request):
        users = generate_random_users(5)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
    @action(detail=False, 
            methods=['post'], 
            url_path='register', 
            serializer_class=RegisterSerializer)
    def register(self, request):
        recaptcha_token = request.data.get("recaptcha_token")
        if not recaptcha_token:
            return Response({"detail": "Missing reCAPTCHA token"}, status=400)

        result = verify_recaptcha(recaptcha_token)
        if not result.get("success") or result.get("score", 0) < 0.5:
            return Response({"detail": "Invalid reCAPTCHA"}, status=400)

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, 
        methods=['post'], 
        url_path='password-reset-request',
        serializer_class=PasswordResetRequestSerializer)
    def password_reset_request(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Лист для відновлення паролю відправлено"}, 
            status=status.HTTP_200_OK
        )

    @action(detail=False, 
            methods=['post'], 
            url_path='password-reset-confirm',
            serializer_class=SetNewPasswordSerializer)
    def password_reset_confirm(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = urlsafe_base64_decode(serializer.validated_data['uid']).decode()
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({"detail": "Невірний uid"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, serializer.validated_data['token']):
            return Response({"detail": "Невірний або прострочений токен"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Пароль успішно змінено"}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"], url_path="google-login")
    def google_login(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"detail": "Missing Google token"}, status=400)

        google_userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(google_userinfo_url, headers=headers)

        if response.status_code != 200:
            return Response({"detail": "Invalid Google token"}, status=400)

        data = response.json()
        email = data.get("email")
        first_name = data.get("given_name", "")
        last_name = data.get("family_name", "")
        picture = data.get("picture")

        if not email:
            return Response({"detail": "Email not provided by Google"}, status=400)

        user, created = CustomUser.objects.get_or_create(email=email, defaults={
            "username": email.split("@")[0],
            "first_name": first_name,
            "last_name": last_name,
        })

        if created and picture:
            try:
                img_response = requests.get(picture)
                if img_response.status_code == 200:
                    tmp_img = NamedTemporaryFile(delete=True)
                    tmp_img.write(img_response.content)
                    tmp_img.flush()

                    name_small = compress_image(tmp_img, size=(300, 300))
                    user.image_small = name_small
                    user.save()

                    name_medium = compress_image(tmp_img, size=(800, 800))
                    user.image_medium = name_medium
                    user.save()

                    name_large = compress_image(tmp_img, size=(1200, 1200))
                    user.image_large = name_large
                    user.save()
            except Exception as e:
                print("Image save error:", e)
                pass

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    
class LoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        recaptcha_token = request.data.get("recaptcha_token")
        if not recaptcha_token:
            return Response({"detail": "Missing reCAPTCHA token"}, status=400)

        result = verify_recaptcha(recaptcha_token)
        if not result.get("success") or result.get("score", 0) < 0.5:
            return Response({"detail": "Invalid reCAPTCHA"}, status=400)

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": "Invalid credentials"}, status=401)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)