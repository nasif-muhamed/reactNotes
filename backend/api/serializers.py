from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Profile
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    notes_count = serializers.IntegerField(source='notes.count', read_only=True)

    class Meta:
        model = User
        extra_kwarg = {'password': {"write_only": True}}
        fields = ["id", "username", "email", "first_name", "profile_image", "notes_count", "password", "is_staff", "is_active"]
        extra_kwargs = {
            'password': {"write_only": True},
            'is_staff': {"required": False},
            'is_active': {"required": False},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("A user with this email already exists.")
        return value
    
    def get_profile_image(self, obj):
        profile = Profile.objects.filter(user=obj).first()
        return profile.image.url if profile and profile.image else None 


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", 'image', 'user']
        extra_kwarg = {'password': {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields  = ['id', 'title', 'content', 'backgroundImage', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}
 