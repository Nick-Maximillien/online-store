from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Product, Customer, Order, OrderItem, Payment
from .serializers import CategorySerializer, ProductSerializer
from django.shortcuts import get_object_or_404
from decimal import Decimal, InvalidOperation

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

@api_view(['POST'])
def create_order(request):
    data = request.data

    # Safely parse total amount
    try:
        total_amount = Decimal(str(data.get('total', '0')))
    except (InvalidOperation, TypeError, ValueError):
        return Response({'error': 'Invalid total amount'}, status=status.HTTP_400_BAD_REQUEST)

    # Create or get customer
    customer, _ = Customer.objects.get_or_create(
        email=data.get('email', ''),
        defaults={
            'full_name': data.get('name', ''),
            'phone': data.get('phone', ''),
            'address': data.get('address', '')
        }
    )

    # Create order
    order = Order.objects.create(
        customer=customer,
        total_amount=total_amount,
    )

    # Add items
    items = data.get('items', [])
    if not items:
        return Response({'error': 'No items in order'}, status=status.HTTP_400_BAD_REQUEST)

    for item in items:
        try:
            product = get_object_or_404(Product, id=item['product_id'])
            quantity = int(item.get('quantity', 1))
            price = Decimal(str(item.get('price', '0')))
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
        except (InvalidOperation, ValueError, KeyError):
            return Response({'error': 'Invalid item data'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'order_id': order.id, 'status': 'pending'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def log_payment(request):
    data = request.data

    try:
        order = Order.objects.get(id=data['orderId'])
        amount = Decimal(str(data.get('amount', '0')))
    except (Order.DoesNotExist, InvalidOperation, KeyError):
        return Response({'error': 'Invalid order or amount'}, status=status.HTTP_400_BAD_REQUEST)

    Payment.objects.create(
        order=order,
        provider=data.get('provider', ''),
        transaction_id=data.get('transactionId', ''),
        amount=amount,
        status=data.get('status', 'failed')
    )

    # Update order status
    order.status = 'paid' if data.get('status') == 'success' else 'failed'
    order.save()

    return Response({'message': 'Payment logged successfully'})

@api_view(['POST'])
def mpesa_callback(request):
    data = request.data
    order_id = data.get('orderId')
    status = data.get('status')

    try:
        order = Order.objects.get(id=order_id)
        order.status = status
        order.save()
        return Response({'message': 'Order updated'})
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)
