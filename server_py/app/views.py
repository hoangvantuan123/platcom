####
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users, UserAccount
from .serializer import *
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from django.db import connections
from rest_framework.viewsets import ModelViewSet
import json
import uuid
from django.http import QueryDict
from django.http import JsonResponse

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


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

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


# lấy dữ liệu 
def get_data(request):
    data = UserAccount.objects.all().values()  # Lấy tất cả dữ liệu từ bảng LoginSerializer

    # Chuyển đổi queryset thành danh sách để serialize thành JSON
    data_list = list(data)

    return JsonResponse(data_list, safe=False)
# Tài khoản người dùng thông thường

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
