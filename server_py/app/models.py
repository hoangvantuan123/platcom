from django.db import models
from django.contrib.auth.models import make_password

# Create your models here.
class Users(models.Model):

    username = models.CharField(max_length=50,unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128, unique=True)
    # Additional fields
    domainAddress = models.CharField(max_length=100, unique=True, default='default_domainAddress')
    employeeCount = models.IntegerField(default=0)
    firstName = models.CharField(max_length=50, default='default_firstName')
    lastName = models.CharField(max_length=50, default='default_lastName')
    phone = models.CharField(max_length=20, default='default_phone')
    emailContact = models.EmailField(max_length=100, unique=True, default='default_emailContact')
    businessAddress = models.CharField(max_length=100, default='default_businessAddress')
    #
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
        # Save the email address 
        self.password = kwargs.pop('password',self.password)
        super(Users, self).save(*args, **kwargs)

