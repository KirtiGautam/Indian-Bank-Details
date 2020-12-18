from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
import csv
from bank.models import Bank, BankDetails
from .serializers import BankSerializer, BankDetailsSerializer
from django.db.models import Q


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def branch(request):
    if 'limit' not in request.GET or 'q' not in request.GET or 'offset' not in request.GET:
        return Response({'message': "Please include 'q', 'limit' and 'offset' before making request"}, status=status.HTTP_400_BAD_REQUEST)
    if not request.GET['limit'] or not request.GET['q'] or not request.GET['offset']:
        return Response({'message': "Please include 'q', 'limit' and 'offset' before making request"}, status=status.HTTP_400_BAD_REQUEST)
    branches = BankDetails.objects.filter(
        branch__icontains=request.GET['q']).order_by('ifsc')

    limit = int(request.GET['limit'])
    offset = int(request.GET['offset'])
    branches = branches[limit*offset:(limit*offset)+limit]
    return Response([{'branches': BankDetailsSerializer(branches, many=True).data}], status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):
    if 'limit' not in request.GET or 'q' not in request.GET or 'offset' not in request.GET:
        return Response({'message': "Please include 'q', 'limit' and 'offset' before making request"}, status=status.HTTP_400_BAD_REQUEST)
    if not request.GET['limit'] or not request.GET['q'] or not request.GET['offset']:
        return Response({'message': "Please include 'q', 'limit' and 'offset' before making request"}, status=status.HTTP_400_BAD_REQUEST)
    branches = BankDetails.objects.filter(
        Q(ifsc__icontains=request.GET['q']) | Q(bank__name__icontains=request.GET['q']) | Q(branch__icontains=request.GET['q']) | Q(address__icontains=request.GET['q']) | Q(city__icontains=request.GET['q']) | Q(district__icontains=request.GET['q']) | Q(state__icontains=request.GET['q'])).order_by('ifsc')

    limit = int(request.GET['limit'])
    offset = int(request.GET['offset'])
    branches = branches[limit*offset:(limit*offset)+limit]
    return Response([{'branches': BankDetailsSerializer(branches, many=True).data}], status=status.HTTP_200_OK)
