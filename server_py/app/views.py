####
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users
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

            # Thực hiện các hành động sau khi xác thực thành công, ví dụ: tạo token truy cập, lưu phiên đăng nhập, vv.
            print('Đăng nhập thành công')

            return Response({'message': 'Login successful'})
        
        return Response(serializer.errors, status=400)