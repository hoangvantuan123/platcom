####
import psycopg2
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users, UserAccount
from .serializer import *
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from django.db import connections
from rest_framework.viewsets import ModelViewSet
import json
import uuid
from django.http import QueryDict
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from psycopg2 import Error
from django.views.generic.base import View
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
import jwt
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication
import logging
from rest_framework.permissions import IsAuthenticated
import sys


class HomeView(TemplateView):
    template_name = "home.html"


class UserCreateView(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.all()


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.all()

# Giair mã token


@api_view(['POST'])
def tokenDatabase(request):
    data = request.data.get('text')  # Lấy dữ liệu từ request
    # Xử lý dữ liệu và thực hiện các tác vụ mong muốn
    # print(data)

    try:
        decoded_token = jwt.decode(data, 'SECRET_KEY', algorithms=['HS256'])
        print(decoded_token)
        username = decoded_token.get('username')
        db_name = f"user_{username.lower()}"
        print(db_name)
        db_connection = {
            'dbname': db_name,
            'user': 'tuanhoang',
            'password': 'password',
            'host': 'localhost',
            'port': '5432',
        }
        try:
            conn = psycopg2.connect(**db_connection)
            cursor = conn.cursor()

            cursor.execute(
                "SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
            table_names = [row[0] for row in cursor.fetchall()]

            data_from_tables = {}

            for table_name in table_names:
                cursor.execute(f'SELECT * FROM {table_name}')
                rows = cursor.fetchall()
                columns = [desc[0] for desc in cursor.description]
                data = [dict(zip(columns, map(str, row))) for row in rows]
                data_from_tables[table_name] = data

            json_data = json.dumps(data_from_tables)
            data = json.loads(json_data)

            cursor.close()
            conn.close()

            return Response(data)

        except Exception as e:
            return Response({'message': f'Lỗi kết nối cơ sở dữ liệu: {str(e)}'}, status=500)

    except jwt.DecodeError:
        # Xử lý lỗi khi không thể giải mã JWT
        print("Không thể giải mã JWT")
    return Response('Success')



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']

            user_serializer = UserSerializer(user)
            user_info = user_serializer.data

            # Mã hoá user_info thành token
            token = jwt.encode(user_info, 'SECRET_KEY', algorithm='HS256')

            request.session['user_info'] = token

            return Response({'token': token})

        return Response(serializer.errors, status=400)

    def get(self, request):
        user_info = request.session.get('user_info')
        print("user_info 2", user_info)
        if user_info:
            user_info_decoded = jwt.decode(
                user_info, 'SECRET_KEY', algorithms=['HS256'])
            username = user_info_decoded.get('username')
            db_name = f"user_{username}"
            print("db_name", db_name)
            """  db_name = f"user_{username}"
            print("db_name", db_name)
            db_connection = {
                'dbname': db_name,
                'user': 'tuanhoang',
                'password': 'password',
                'host': 'localhost',
                'port': '5432',
            }
            try:
                conn = psycopg2.connect(**db_connection)
                cursor = conn.cursor()

                table_names = []
                data_from_tables = {}

                # Thực hiện truy vấn để lấy dữ liệu từ bảng tương ứng
                cursor.execute(
                    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
                for row in cursor.fetchall():
                    table_names.append(row[0])

                for table_name in table_names:
                    cursor.execute(f'SELECT * FROM {table_name}')
                    rows = cursor.fetchall()
                    columns = [desc[0] for desc in cursor.description]
                    data = [dict(zip(columns, map(str, row))) for row in rows]
                    data_from_tables[table_name] = data

                # Chuyển đổi dữ liệu thành JSON
                json_data = json.dumps(data_from_tables)
                data = json.loads(json_data)
                cursor.close()
                conn.close()

                return Response(data)

            except Exception as e:
                return Response({'message': f'Lỗi kết nối cơ sở dữ liệu: {str(e)}'}, status=500) """
        else:
            return Response({'message': 'Người dùng chưa đăng nhập hoi cham '}, status=401)

    """ def get(self, request):
        login_checker = LoginChecker()
        login_success, user_info = login_checker.check_login_success(request)

        if login_success:
            return Response(user_info)
        else:
            return Response({'message': 'Người dùng chưa đăng nhập'}, status=401) """


# Tài khoản người dùng thông thường """
class UserAccountCreateView(generics.CreateAPIView):
    serializer_class = UserAccountSerializer

    def create(self, request, *args, **kwargs):
        username = self.request.user.username if self.request.user.is_superuser else ''

        mutable_data = request.data.copy()
        mutable_data['username'] = username

        request._full_data = mutable_data

        return super().create(request, *args, **kwargs)


class LoginUserAccountCreateView(APIView):
    def post(self, request):
        serializer = LoginAccountSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            db_connection = serializer.validated_data.get('db_connection')

            if db_connection == 'Kết nối cơ sở dữ liệu thành công':
                # Thực hiện các hành động sau khi kết nối cơ sở dữ liệu thành công
                print('Kết nối cơ sở dữ liệu thành công')

            # Sử dụng serializer mới để chuyển đổi đối tượng user thành JSON
            user_serializer = UserSerializer(user)
            user_info = user_serializer.data

            # Lưu thông tin người dùng vào session
            request.session['user_info'] = user_info
            # print(user_info)
            # Thực hiện các hành động sau khi xác thực thành công, ví dụ: tạo token truy cập, lưu phiên đăng nhập, vv.
            # Tạo token người dùng
            print('Đăng nhập thành công')

            return Response(user_info)

        return Response(serializer.errors, status=400)

    def get(self, request):
        user_info = request.session.get('user_info')

        if user_info:
            return Response(user_info)
        else:
            return Response({'message': 'User not logged in'}, status=401)
