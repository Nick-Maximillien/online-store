from django.contrib import admin
from .models import Category, Product, ProductImage, Customer, Order, OrderItem, Payment

admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Product, ProductAdmin)    