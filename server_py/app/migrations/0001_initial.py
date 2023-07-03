# Generated by Django 3.2.6 on 2023-07-03 08:54

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatGroup',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('members', models.JSONField(default=list)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('sender_id', models.TextField()),
                ('receiver_id', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(blank=True, max_length=150, null=True)),
                ('database', models.CharField(max_length=150)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('sex', models.CharField(choices=[('M', 'Nam'), ('F', 'Nữ')], max_length=1)),
                ('phone_number', models.CharField(max_length=20)),
                ('hometown', models.CharField(max_length=100)),
                ('birth_date', models.DateField()),
                ('user_status', models.CharField(max_length=50)),
                ('admin_role', models.BooleanField(default=False)),
                ('admin_email', models.EmailField(max_length=254)),
                ('job_title', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('department_abbreviation', models.CharField(max_length=10)),
                ('department_id', models.CharField(max_length=10)),
                ('memory_status', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('last_login', models.DateTimeField(null=True)),
                ('last_logout', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('domainAddress', models.CharField(default='default_domainAddress', max_length=100)),
                ('employeeCount', models.IntegerField(default=0)),
                ('firstName', models.CharField(default='default_firstName', max_length=50)),
                ('lastName', models.CharField(default='default_lastName', max_length=50)),
                ('phone', models.CharField(default='default_phone', max_length=20)),
                ('emailContact', models.EmailField(default='default_emailContact', max_length=100, unique=True)),
                ('businessAddress', models.CharField(default='default_businessAddress', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('last_login', models.DateTimeField(null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ChatMessageGroup',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sender_id', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.chatgroup')),
            ],
        ),
    ]
