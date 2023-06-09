from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import check_password
from django.db import connection
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'domainAddress', 'employeeCount', 'firstName', 'lastName', 'phone', 'emailContact', 'businessAddress', 'created_at', 'updated_at']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        database_name = f"user_{validated_data['username']}"
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE {database_name};")
            # Thực hiện các câu truy vấn tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con

        return user

    def access_database(self, username):
        database_name = f"user_{username}"
        # Thực hiện các câu truy vấn để truy cập vào cơ sở dữ liệu con

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        # print('password', password)
        
        if email and password:
            user = Users.objects.filter(email=email).first()
            if not user:
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')
            
            if not user.check_password(password):
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')
                
            # Mật khẩu chính xác, tiếp tục xử lý
            db_name = f"user_{user.username}"
            db_url = f"postgresql://tuanhoang:password@localhost/{db_name}"
            engine = create_engine(db_url)

            Session = sessionmaker(bind=engine)
            session = Session()
            if session.is_active:
                attrs['user'] = user
                attrs['db_connection'] = 'Kết nối cơ sở dữ liệu thành công'
                session.close()
                return attrs
            else:
                raise serializers.ValidationError('Không thể kết nối đến cơ sở dữ liệu con')
        else:
            raise serializers.ValidationError('Vui lòng cung cấp cả email và mật khẩu')
