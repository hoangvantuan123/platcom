####
from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from django.db import connection
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from django.core.exceptions import ValidationError
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'domainAddress', 'employeeCount', 'firstName', 'lastName', 'phone', 'emailContact', 'businessAddress', 'created_at', 'updated_at']

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(password=self.validate_password(password), **validated_data)

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
        # Xác thực 
        user = authenticate(email=email, password=password)
       
        if email and password:
            user = Users.objects.filter(email=email).first()
            if user:
                # Tạo tên cơ sở dữ liệu con từ tên người dùng
                db_name = f"user_{user.username}"

                # Thiết lập kết nối đến cơ sở dữ liệu con
                db_url = f"postgresql://tuanhoang:password@localhost/{db_name}"
                print(db_url)
                engine = create_engine(db_url)

                # Kiểm tra kết nối thành công và in thông báo
                Session = sessionmaker(bind=engine)
                session = Session()
                if session.is_active:
                    attrs['user'] = user
                    attrs['db_connection'] = 'Kết nối cơ sở dữ liệu thành công'

                    # Tạo bảng trong cơ sở dữ liệu con
                   # with session.begin():
                       # session.execute(text("""
                           # CREATE TABLE IF NOT EXISTS my_table (
                              #  id SERIAL PRIMARY KEY,
                               # name VARCHAR(255) NOT NULL
                           # )
                        #"""))
                        # Thêm các câu truy vấn khác tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con

                    session.close()
                    attrs['user'] = user
                    return attrs
                else:
                    raise serializers.ValidationError('Không thể kết nối đến cơ sở dữ liệu con')
            else:
                raise serializers.ValidationError('User with this email does not exist.')
        else:
            raise serializers.ValidationError('Please provide both email and password.')

