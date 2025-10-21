from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.StringRelatedField(source='user.first_name', read_only=True)  # fixed typo
    topic_name = serializers.StringRelatedField(source='topic.name', read_only=True)
    has_media = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'body',
            'image',
            'video',
            'video_url',
            'created_at',
            'user',
            'topic',
            'topic_name',
            'user_name',
            'has_media',
        ]

    # def get_has_media(self, obj):
    #     return obj.has_media()
