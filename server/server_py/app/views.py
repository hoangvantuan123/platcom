####
import psycopg2
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
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
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import UntypedToken
from django.utils.translation import gettext as _
from datetime import datetime
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404


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
            print("User", user)
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
            print("User", user)

            # Sử dụng serializer mới để chuyển đổi đối tượng user thành JSON
            user_serializer = UserAccountSerializer(user)
            user_account_info = user_serializer.data

            print("user_account_info", user_account_info)
            # Mã hoá user_info thành token
            token = jwt.encode(user_account_info,
                               'SECRET_KEY', algorithm='HS256')
            # print('Đăng nhập thành công')

            request.session['user_account_info'] = token

            return Response({'token': token})

        return Response(serializer.errors, status=400)

    def get(self, request):
        user_account_info = request.session.get('user_account_info')

        if user_account_info:
            return Response(user_account_info)
        else:
            return Response({'message': 'User not logged in'}, status=401)


@api_view(['POST'])
def token_logout(request):
    token = request.data.get('text')
    print(token)
    try:
        decoded_token = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
        print(decoded_token)
        database = decoded_token.get('database')
        user_id = decoded_token.get('id')
        print(user_id)
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
            # Cập nhật giá trị last_logout cho người dùng với thời gian hiện tại
            current_time = datetime.now()
            # Cập nhật giá trị last_logout cho người dùng
            cursor.execute(
                f"UPDATE app_useraccount SET last_logout = '{current_time}' WHERE id = '{user_id}'")

            # Lưu thay đổi vào cơ sở dữ liệu
            conn.commit()

            cursor.close()
            conn.close()

            return Response('Success')

        except Exception as e:
            return Response({'message': f'Lỗi kết nối cơ sở dữ liệu: {str(e)}'}, status=500)

    except jwt.DecodeError:
        # Xử lý lỗi khi không thể giải mã JWT
        print("Không thể giải mã JWT")
    return Response('Success')


@api_view(['POST'])
# Sử dụng JWTAuthentication để xác thực
@authentication_classes([JWTAuthentication])
def logout_view(request):
    # Lấy thông tin người dùng từ request.user
    user = request.user
    print(user)
    """     # Xóa token khỏi local storage
        if 'user_account_info' in request.session:
            del request.session['user_account_info'] """

    return Response(status=200)


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
""" @csrf_exempt
def message_list(request):
    if request.method == 'GET':
        messages = Message.objects.all().order_by('created_at')
        data = [{'text': message.text, 'created_at': message.created_at} for message in messages]
        return JsonResponse(data, safe=False)
    
    elif request.method == 'POST':
        text = request.POST.get('text', '')
        message = Message.objects.create(text=text)
        return JsonResponse({'id': message.id, 'text': message.text, 'created_at': message.created_at}) """


@csrf_exempt
def message_list(request):
    if request.method == 'GET':
        messages = Message.objects.all().order_by('created_at')
        data = [{'text': message.text, 'created_at': message.created_at,
                 'sender_id': message.sender_id, 'receiver_id': message.receiver_id} for message in messages]
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        text = data.get('text', '')
        sender_id = data.get('sender_id', '')
        receiver_id = data.get('receiver_id', '')

        message = Message.objects.create(
            text=text, sender_id=sender_id, receiver_id=receiver_id)
        response_data = {
            'id': message.id,
            'text': message.text,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'created_at': message.created_at,
        }
        return JsonResponse(response_data)
###


@async_to_sync
async def send_message_to_group(group_name, message, sender_id):
    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        group_name,
        {
            'type': 'chat_message',
            'message': message,
            'sender_id': sender_id
        }
    )


@api_view(['GET', 'POST'])
def send_message(request, group_id):
    if request.method == 'GET':
        # Handle GET request to retrieve messages from the group
        group = get_object_or_404(ChatGroup, id=group_id)
        messages = ChatMessageGroup.objects.filter(group=group)

        # Convert messages to JSON or perform other desired operations
        serialized_messages = [
            {'text': message.text, 'sender_id': message.sender_id} for message in messages]
        return Response(serialized_messages)
    elif request.method == 'POST':
        # Handle POST request to send a new message to the group
        group = get_object_or_404(ChatGroup, id=group_id)
        message = request.data['message']
        sender_id = request.data['sender_id']

        # Save the message to the database
        chat_message_group = ChatMessageGroup.objects.create(
            group=group,
            text=message,
            sender_id=sender_id
        )

        # Send the message to the group
        send_message_to_group('chat_%s' % group_id, message, sender_id)

        return Response({'status': 'success'})


@api_view(['GET', 'POST'])
def create_group(request):
    if request.method == 'GET':
        # Handle GET request to retrieve existing groups
        groups = ChatGroup.objects.all()
        serialized_groups = [{'id': group.id, 'name': group.name}
                             for group in groups]
        return Response(serialized_groups)
    elif request.method == 'POST':
        # Handle POST request to create a new group
        name = request.data['name']
        members = request.data.get('members', [])

        group = ChatGroup.objects.create(name=name, members=members)

        return Response({'status': 'success'})


@api_view(['GET', 'POST'])
def add_member(request, group_id):
    try:
        group = ChatGroup.objects.get(id=group_id)
    except ChatGroup.DoesNotExist:
        return Response({'error': 'ChatGroup not found'}, status=404)

    if request.method == 'GET':
        # Xử lý yêu cầu GET để lấy danh sách thành viên trong nhóm
        members = group.members
        serialized_members = [
            {'id': member, 'name': f'Thành viên {member}'} for member in members]
        return Response(serialized_members)

    elif request.method == 'POST':
        # Xử lý yêu cầu POST để thêm thành viên mới vào nhóm
        member_id = request.data.get('member_id')
        if member_id is None:
            return Response({'error': 'Missing member_id'}, status=400)

         # Kiểm tra xem member_id đã tồn tại trong nhóm chưa
        if member_id in group.members:
            return Response({'error': 'Member already exists in the group'}, status=400)

        # Trích xuất giá trị JSON, thêm thành viên mới và lưu trở lại
        members = group.members
        members.append(member_id)
        group.members = members
        group.save()

        return Response({'status': 'success'})
