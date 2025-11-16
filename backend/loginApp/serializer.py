from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    rut = serializers.CharField(required=True, max_length=12)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    is_active = serializers.BooleanField(read_only=True)
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    def validate_password(self, password):
        return make_password(password)  
    

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'rut', 'first_name', 'last_name', 'password', 'is_active', 'groups']