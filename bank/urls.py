from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/branches/autocomplete/', views.branch, name='dd'),
    path('api/branches/', views.branch, name='bb'),
    path('api/bank/<str:ifsc>/', views.bankDetails, name='details'),
    url(r'^', views.index, name='index'),
]
