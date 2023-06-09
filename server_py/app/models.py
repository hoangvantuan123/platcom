from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Users(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    domainAddress = models.CharField(max_length=100, default='default_domainAddress')
    employeeCount = models.IntegerField(default=0)
    firstName = models.CharField(max_length=50, default='default_firstName')
    lastName = models.CharField(max_length=50, default='default_lastName')
    phone = models.CharField(max_length=20, default='default_phone')
    emailContact = models.EmailField(max_length=100, unique=True, default='default_emailContact')
    businessAddress = models.CharField(max_length=100, default='default_businessAddress')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Chú ý khai mã hoá phải có hàm giải mã. và đây là mã hoá 1 lần và trong phần đăng ký không cần thêm phương thức mã hoá nữa
    def set_password(self, raw_password):
        # Mã hoá mật khẩu một lần
        encrypted_password = make_password(raw_password)
        self.password = encrypted_password

    def check_password(self, raw_password):
        # Giải mã mật khẩu một lần
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)