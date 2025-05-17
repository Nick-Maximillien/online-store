from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product, Customer, Order, OrderItem, Purchase
from .serializers import CategorySerializer, ProductSerializer, PurchaseSerializer
from django.shortcuts import get_object_or_404
from decimal import Decimal, InvalidOperation
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

@api_view(['GET'])
def product_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def category_products(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def customer_purchases(request):
    email = request.query_params.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.get(email=email)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

    purchases = Purchase.objects.filter(customer=customer)
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def mpesa_callback(request):
    data = request.data
    order_id = data.get('order_id') or data.get('orderId')
    status = data.get('status')

    if not order_id or not status:
        return Response({'error': 'Missing order ID or status'}, status=400)

    try:
        order = Order.objects.get(id=order_id)
        order.status = status
        order.save()
        return Response({'message': 'Order updated'})
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

@api_view(['POST'])
def create_order(request):
    data = request.data

    try:
        total = Decimal(str(data.get('total')))
    except (InvalidOperation, TypeError):
        return Response({'error': 'Invalid total amount'}, status=status.HTTP_400_BAD_REQUEST)

    name = data.get('name', 'Unknown')
    email = data.get('email', '')
    phone = data.get('phone', '')
    address = data.get('address', '')
    items = data.get('items', [])

    if not items:
        return Response({'error': 'No items provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Get or create customer
    customer, _ = Customer.objects.get_or_create(
        email=email,
        defaults={
            'full_name': name,
            'phone': phone,
            'address': address
        }
    )

    order = Order.objects.create(
        name=name,
        email=email,
        phone=phone,
        address=address,
        total_amount=total,
        status='pending',
        user=request.user if request.user.is_authenticated else None,
        customer=customer
    )

    try:
        for item in items:
            product = get_object_or_404(Product, id=item['product_id'])
            quantity = int(item.get('quantity', 1))
            price = Decimal(str(item.get('price', '0')))
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)

            # Record purchase for customer
            Purchase.objects.create(
                customer=customer,
                product=product,
                quantity=quantity,
                total_price=price * quantity
            )
    except (InvalidOperation, ValueError, KeyError) as e:
        order.delete()
        return Response({'error': 'Invalid item data', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'order_id': order.id, 'status': 'pending'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate a unique username using the email
    base_username = email.split('@')[0]
    username = base_username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1

    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': {
            'username': user.username,
            'email': user.email
        }
    })


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user = authenticate(username=user.username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
