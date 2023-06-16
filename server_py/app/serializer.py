from rest_framework import serializers
from .models import Users, UserAccount
from django.contrib.auth.hashers import check_password
from django.db import connection
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy import text
from django.db import transaction
import datetime
from django.contrib.auth.models import AnonymousUser


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'domainAddress', 'employeeCount', 'firstName',
                  'lastName', 'phone', 'emailContact', 'businessAddress', 'created_at', 'updated_at']

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
                raise serializers.ValidationError(
                    'Email hoặc mật khẩu không chính xác')

            if not user.check_password(password):
                raise serializers.ValidationError(
                    'Email hoặc mật khẩu không chính xác')

            # Mật khẩu chính xác, tiếp tục xử lý
            db_name = f"user_{user.username.lower()}"
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
                raise serializers.ValidationError(
                    'Không thể kết nối đến cơ sở dữ liệu con')
        else:
            raise serializers.ValidationError(
                'Vui lòng cung cấp cả email và mật khẩu')

    def to_representation(self, instance):
        user = instance['user']
        user_info = {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
            # Các thông tin khác của tài khoản
        }
        if 'data_from_tables' in instance:
            user_info['data_from_tables'] = instance['data_from_tables']
        return user_info



#  Tài khoản thứ thứ2: Người dùng thông thường : Đăng ký ở phía admin
class UserAccountSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    username = serializers.CharField(read_only=True)
    # Nên để lại để biết đang dùng thuộc tính nào
    # Để gọi username từ tài khoản siêu người dùng
    #

    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'username', 'database', 'first_name', 'last_name', 'sex', 'password', 'phone_number', 'hometown', 'birth_date', 'user_status', 'admin_email', 'admin_role',
                  'job_title', 'department', 'department_abbreviation', 'department_id', 'memory_status', 'created_at', 'updated_at']

    def create(self, validated_data):
        password = validated_data.pop('password')
        # Lấy giá trị database từ dữ liệu đã xác nhận
        database = validated_data.get('database')
        # Thay đổi các giá trị dựa trên thông tin cấu hình của bạn
        dbname = f"user_{database.lower()}"
        db_user = 'tuanhoang'
        db_password = 'password'
        host = 'localhost'
        port = '5432'

        with transaction.atomic():
            # Tạo kết nối
            conn = psycopg2.connect(dbname=dbname, user=db_user,
                                    password=db_password, host=host, port=port)

            # Tạo đối tượng Cursor để thực thi truy vấn
            cur = conn.cursor()
            # Tạo bảng UserAccount nếu chưa tồn tại
            cur.execute('''
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sex_enum') THEN
                        CREATE TYPE sex_enum AS ENUM ('M', 'F');
                    END IF;
                END $$;
                
                CREATE TABLE IF NOT EXISTS app_useraccount (
                    id UUID PRIMARY KEY,
                    email VARCHAR(254) UNIQUE,
                    username VARCHAR(150),
                    database VARCHAR(150),
                    first_name VARCHAR(50),
                    last_name VARCHAR(50),
                    sex sex_enum,
                    password VARCHAR(128),
                    phone_number VARCHAR(20),
                    hometown VARCHAR(100),
                    birth_date DATE,
                    user_status VARCHAR(50),
                    admin_role BOOLEAN,
                    admin_email VARCHAR(254),
                    job_title VARCHAR(100),
                    department VARCHAR(100),
                    department_abbreviation VARCHAR(10),
                    department_id VARCHAR(10),
                    memory_status VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            # Tạo đối tượng UserAccount
            user = UserAccount(**validated_data)
            user.set_password(password)

            # Lưu thông tin người dùng vào bảng
            cur.execute('''
                INSERT INTO app_useraccount (
                    id, email, username, database,first_name,last_name, sex,  password, phone_number, hometown, birth_date, user_status,
                    admin_role, admin_email, job_title, department, department_abbreviation,
                    department_id, memory_status, created_at, updated_at
                )
                VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s
                )
            ''', (
                str(user.id), user.email, user.username,  user.database, user.first_name, user.last_name, user.sex, user.password, user.phone_number, user.hometown, user.birth_date, user.user_status,
                user.admin_role, user.admin_email, user.job_title, user.department, user.department_abbreviation,
                user.department_id, user.memory_status, user.created_at, user.updated_at
            ))

            # Commit các thay đổi vào cơ sở dữ liệu
            conn.commit()

            # Đóng kết nối
            cur.close()
            conn.close()
         # Lưu dữ liệu vào cơ sở dữ liệu chính của Django
        user.save()

        return user


# Tài khoản thứ 2: Đăng nhập ở phía client
class LoginAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        # print('password', password)

        if email and password:
            user = UserAccount.objects.filter(email=email).first()
            if not user:
                raise serializers.ValidationError(
                    'Email hoặc mật khẩu không chính xác')

            if not user.check_password(password):
                raise serializers.ValidationError(
                    'Email hoặc mật khẩu không chính xác')

            # Mật khẩu chính xác, tiếp tục xử lý
            db_name = f"user_{user.database.lower()}"
            db_url = f"postgresql://tuanhoang:password@localhost/{db_name}"
            engine = create_engine(db_url)

            Session = sessionmaker(bind=engine)
            session = Session()
            if session.is_active:
                attrs['user'] = user
                attrs['db_connection'] = f"Kết nối cơ sở dữ liệu thành công: {user.database}"
                # Tạo bảng trong cơ sở dữ liệu con
                # with session.begin():
                # session.execute(text("""
                # CREATE TABLE IF NOT EXISTS my_table (
                # id SERIAL PRIMARY KEY,
                # name VARCHAR(255) NOT NULL

                # )
                # """))
                # Thêm các câu truy vấn khác tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con
                session.close()
                return attrs
            else:
                raise serializers.ValidationError(
                    'Không thể kết nối đến cơ sở dữ liệu con')
        else:
            raise serializers.ValidationError(
                'Vui lòng cung cấp cả email và mật khẩu')

    def to_representation(self, instance):
        user = instance['user']
        user_info = {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
            # Các thông tin khác của tài khoản
        }
        return user_info
