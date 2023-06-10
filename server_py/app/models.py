from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from django.utils import timezone
 # Tạo tài khoản admin quản lý doanh nghiệp 

 # Ở đây sẽ có hai loại tài khoản 
 # Tài khoản thứ 1: SuperuserAccount : Siêu người dùng 
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

 # Tài khoản thứ 1: SuperuserAccount : Siêu người dùng 
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




# Tài khoản thứ 2: RegularUserAccount : Tài khoản người dùng thông thường
class UserManagerAccount(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email phải được cung cấp bởi doanh nghiệp")
        
        email = self.normalize_email(email)
        username = extra_fields.pop('username', None)  # Lấy giá trị username từ extra_fields
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser phải có is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser phải có is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
# Tài khoản thứ 2: RegularUserAccount : Tài khoản người dùng thông thường
class UserAccount(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    hometown = models.CharField(max_length=100)
    birth_date = models.DateField()
    user_status = models.CharField(max_length=50)
    admin_role = models.BooleanField(default=False)
    admin_email = models.EmailField()
    job_title = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    department_abbreviation = models.CharField(max_length=10)
    department_id = models.CharField(max_length=10)
    memory_status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManagerAccount()

    def set_password(self, raw_password):
        # Mã hoá mật khẩu
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        # Kiểm tra mật khẩu
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        if not self.username:
            # Gán giá trị username từ email của người đăng nhập
            self.username = self.email.split('@')[0]
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)