####
import psycopg2
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users, UserAccount , Message
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
from rest_framework import viewsets, status
import json
import uuid
from django.http import QueryDict
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
# Chat
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


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

# Đoạn mã dùng cho admin người dùng
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
            print("User" , user)
            user_serializer = UserSerializer(user)
            user_info = user_serializer.data

            # Mã hoá user_info thành token
            token = jwt.encode(user_info, 'SECRET_KEY', algorithm='HS256')

            request.session['user_info'] = token

            return Response({'token': token})

        return Response(serializer.errors, status=400)

    def get(self, request):
        user_info = request.session.get('user_info')

        if user_info:
            return Response(user_info)
        else:
            return Response({'message': 'User not logged in'}, status=401)

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
            print("User" , user)
           

            # Sử dụng serializer mới để chuyển đổi đối tượng user thành JSON
            user_serializer = UserAccountSerializer(user)
            user_account_info = user_serializer.data

            print("user_account_info" , user_account_info)
            # Mã hoá user_info thành token
            token = jwt.encode(user_account_info, 'SECRET_KEY', algorithm='HS256')
            #print('Đăng nhập thành công')

            request.session['user_account_info'] = token

            return Response({'token': token})

        return Response(serializer.errors, status=400)

    def get(self, request):
        user_account_info = request.session.get('user_account_info')

        if user_account_info:
            return Response(user_account_info)
        else:
            return Response({'message': 'User not logged in'}, status=401)


# Đoạn mã dùng cho phía người dùng 
# Lấy thông tin token từ phía người dùng để xử lý và truy cập vào database tương ứng 

@api_view(['POST'])
def tokenDatabaseUserAccountMess(request):
    data = request.data.get('text')  # Lấy dữ liệu từ request
    # Xử lý dữ liệu và thực hiện các tác vụ mong muốn
    # print(data)

    try:
        decoded_token = jwt.decode(data, 'SECRET_KEY', algorithms=['HS256'])
        print(decoded_token)
        database = decoded_token.get('database')
        db_name = f"user_{database.lower()}"
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



# Chat functions
@csrf_exempt
def message_list(request):
    if request.method == 'GET':
        messages = Message.objects.all().order_by('created_at')
        data = [{'text': message.text, 'created_at': message.created_at} for message in messages]
        return JsonResponse(data, safe=False)
    
    elif request.method == 'POST':
        text = request.POST.get('text', '')
        message = Message.objects.create(text=text)
        return JsonResponse({'id': message.id, 'text': message.text, 'created_at': message.created_at})
