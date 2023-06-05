from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password
from django.db import connection

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'created_at', 'updated_at']

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(**validated_data, password=self.validate_password(password))

        database_name = f"user_{validated_data['username']}"
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE {database_name};")
            # Thực hiện các câu truy vấn tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con

        return user
from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password
from django.db import connection

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'created_at', 'updated_at']

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(**validated_data, password=self.validate_password(password))

        database_name = f"user_{validated_data['username']}"
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE {database_name};")
            # Thực hiện các câu truy vấn tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con

        return user
