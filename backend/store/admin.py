from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage, Customer, Order, OrderItem, Payment

# Register simple models
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)

# Inline images for product
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

# Product admin with image inline and slug auto-fill
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    prepopulated_fields = {"slug": ("name",)}

# Category admin with image preview
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'featured', 'image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Image'

# Register with custom admin classes
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
