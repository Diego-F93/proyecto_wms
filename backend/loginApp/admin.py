from django.contrib import admin
from django.contrib.auth.decorators import user_passes_test
from .models import CustomUser, CustomUserManager



# Register your models here.
admin.site.site_header = "WMS Administration"
admin.register(CustomUserManager)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'rut', 'area', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name', 'rut', 'area')
    list_filter = ('is_active', 'is_staff', 'area')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'rut', 'area')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
