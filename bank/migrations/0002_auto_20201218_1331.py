# Generated by Django 3.1.3 on 2020-12-18 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankdetails',
            name='address',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='bankdetails',
            name='branch',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='bankdetails',
            name='city',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='bankdetails',
            name='district',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='bankdetails',
            name='state',
            field=models.CharField(max_length=255),
        ),
    ]