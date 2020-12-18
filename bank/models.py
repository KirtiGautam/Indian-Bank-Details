from django.db import models


class Bank(models.Model):
    name = models.CharField(max_length=100)


class BankDetails(models.Model):
    ifsc = models.CharField(max_length=20, primary_key=True)
    bank = models.ForeignKey(
        Bank, related_name='details', on_delete=models.CASCADE)
    branch = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
