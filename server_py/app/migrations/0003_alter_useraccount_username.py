# Generated by Django 4.2.1 on 2023-06-12 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_useraccount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='username',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
