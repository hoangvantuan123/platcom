# Generated by Django 3.2.6 on 2023-07-01 08:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={},
        ),
        migrations.RenameField(
            model_name='message',
            old_name='timestamp',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='content',
            new_name='text',
        ),
        migrations.RemoveField(
            model_name='message',
            name='username',
        ),
        migrations.AlterModelTable(
            name='message',
            table=None,
        ),
    ]
