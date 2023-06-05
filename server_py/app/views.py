from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users
from .serializer import UserSerializer
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import psycopg2
from django.views.decorators.csrf import csrf_exempt


class HomeView(TemplateView):
    template_name = "home.html"

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.all()

class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.all()

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = Users.objects.create(
                username=username,
                email=serializer.validated_data['email'],
                password=make_password(password)
            )

            # Tạo cơ sở dữ liệu con mới trong PostgreSQL
            con = psycopg2.connect(
                dbname='main_database',
                user='your_username',
                password='your_password',
                host='localhost',
                port='5432'
            )
            cur = con.cursor()

            # Tạo bảng người dùng trong cơ sở dữ liệu con
            query = f"CREATE TABLE {username} (id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100))"
            cur.execute(query)

            # Thêm thông tin người dùng vào cơ sở dữ liệu con
            query = f"INSERT INTO {username} (username, password) VALUES ('{username}', '{password}')"
            cur.execute(query)

            con.commit()
            cur.close()
            con.close()
            return Response({'message': 'User registered successfully.'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            try:
                # Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu mẹ không
                user = Users.objects.get(username=username)
                if not user.check_password(password):
                    return Response({'message': 'Invalid username or password.'})
            except Users.DoesNotExist:
                return Response({'message': 'Invalid username or password.'})

            try:
                # Kết nối đến cơ sở dữ liệu con
                con = psycopg2.connect(
                    dbname=username,
                    user='your_username',
                    password='your_password',
                    host='localhost',
                    port='5432'
                )
                cur = con.cursor()

                # Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu con không
                query = f"SELECT * FROM {username} WHERE username='{username}'"
                cur.execute(query)
                result = cur.fetchone()

                if result is not None:
                    return Response({'message': 'Login successful.'})
                else:
                    return Response({'message': 'Invalid username or password.'})

            except psycopg2.Error as e:
                return Response({'message': 'Error connecting to the database.'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users
from .serializer import UserSerializer
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import psycopg2

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

