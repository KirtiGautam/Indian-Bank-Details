from django.urls import path
from . import views

urlpatterns = [
    path('api/branches/autocomplete/', views.branch, name='dd'),
    path('api/branches/', views.branch, name='bb'),
]
