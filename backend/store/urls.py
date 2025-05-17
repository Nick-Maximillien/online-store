from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.product_categories),
    path('products/', views.products),
    path('products/<slug:slug>/', views.product_detail),
    path('categories/<slug:slug>/products/', views.category_products),
    path('orders/', views.create_order, name='create_order'),
    path('payments/callback/mpesa/', views.mpesa_callback, name='mpesa_callback'),
    path('purchases/', views.customer_purchases, name='customer_purchases'),
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login, name='login'),
]



