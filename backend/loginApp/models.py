# Librerias de Django para modelos y autentificacion 
from django.contrib.auth.models import AbstractUser, Group, UserManager
from django.contrib.auth.hashers import make_password
from django.db import models
# Señales para crear grupos automaticamente al migrar la app
from django.db.models.signals import post_migrate
from django.dispatch import receiver
# Libreria para manejo de JSON
import json

#  Modelo de usuario personalizado para El login
class CustomUserManager(UserManager):
    def _build_username(self, first_name, last_name):
        base = f"{first_name.lower()}.{last_name.lower()}"
        if not base.split('.')[0]:  # Si el nombre esta vacio
            base = "user"
        username = base
        i = 1
        while self.model.objects.filter(username=username).exists():
            username = f"{base}{i}"
            i += 1
        return username

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        
        first_name = extra_fields.get('first_name', '') or ''
        last_name = extra_fields.get('last_name', '') or ''

        username = self._build_username(first_name, last_name)
        user = self.model(email=email, username=username, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields) 


class CustomUser(AbstractUser): 
    email = models.EmailField(unique=True, max_length=150) # Campo de email Unico
    rut = models.CharField(unique=True, max_length=12) # Campo RUT unico
    area = models.CharField(max_length=100, blank=True, null=True, default=None) # Area de trabajo
    is_active = models.BooleanField(default=False) # Estado de cuenta
    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True) # Grupos del usuario

    
    USERNAME_FIELD = 'email' # Usa el Email como nombre de usuario
    REQUIRED_FIELDS = ['first_name','last_name','rut'] # Campos requeridos al crear el usuario 

    objects = CustomUserManager() # Asigna el manager personalizado
    
    def _Build_username(self):
        base = f"{self.first_name.lower()}.{self.last_name.lower()}"
        if not base.split('.')[0]:  # Si el nombre esta vacio
            base = "user"
        username = base
        i = 1
        while CustomUser.objects.filter(username=username).exists():
            username = f"{base}{i}"
            i += 1
        return username
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)  # Asegura que la contraseña este hasheada
        if not self.username:
            self.username = self._Build_username()
        
        super().save(*args, **kwargs)


    def __str__(self): # Representacion en cadena del usuario
        usuario = {
            'id': self.id,
            'name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'area': self.area,
            'is_active': self.is_active,
        }
        return json.dumps(usuario) # Retorna la informacion del usuario en formato JSON
    

    
    def add_to_group(self, group_name): # Metodo para añadir usuario a un grupo
        try:
            group = Group.objects.get(name=group_name)
            self.groups.add(group)
            self.save()
        except Group.DoesNotExist:
            pass

    def remove_from_group(self, group_name): # Metodo para remover usuario de un grupo
        try:
            group = Group.objects.get(name=group_name)
            self.groups.remove(group)
            self.save()
        except Group.DoesNotExist:
            pass




# Creacion de grupos predetermiados al migrar app
grupos = ['Administrador', 'Supervisor','Operador']


@receiver(post_migrate)
def crear_grupos(sender, **kwargs):
    for grupo in grupos:
        grupo, created = Group.objects.get_or_create(name=grupo) # Crea el grupo si no existe
        grupo.save()