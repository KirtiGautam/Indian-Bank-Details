from rest_framework import serializers
from .models import BankDetails, Bank


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'


class BankDetailsSerializer(serializers.ModelSerializer):
    bank = BankSerializer(read_only=True, required=False)

    class Meta:
        model = BankDetails
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['bank'] = instance.bank.name
        return response
