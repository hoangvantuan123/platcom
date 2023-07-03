"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from app.views import *
from django.views.generic import TemplateView
from . import routing

urlpatterns = [
    path("admin/", admin.site.urls),
    # re_path(r"^$", HomeView.as_view(), name="home"),
    path("users/", UserList.as_view(), name="user-list"),
    path("users/<int:pk>/", UserDetails.as_view(), name="user-detail"),
    path('api/register/', UserCreateView.as_view(), name='user-register'),
    path('accounts/login/', LoginView.as_view(), name='user-login'),
    path('register/', UserAccountCreateView.as_view(), name='user'),
    path('login/', LoginUserAccountCreateView.as_view(), name='user-account-login'),
    path('logout/', logout_view, name='logout'),
    # Giải mã token
    path('api/token/database/', tokenDatabase, name='token-database'),
    path('api/token/database/user/message/',
         tokenDatabaseUserAccountMess, name='token-database-message'),
    path('api/token/logout/', token_logout, name='token-database'),
    # CHAT...
    path('api/messages/', message_list, name='message_list'),
    path('create-group/', create_group),
    path('add-member/<str:group_id>/', add_member),
    path('send-message-group/<str:group_id>/', send_message),


]
