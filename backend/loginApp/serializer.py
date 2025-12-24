from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    password2 = serializers.CharField(write_only=True, required=True, min_length=8)

    is_active = serializers.BooleanField(read_only=True)

    # Mostrar grupos (solo lectura)
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    # (Opcional) permitir asignar grupos por nombre al crear/actualizar
    groups_names = serializers.SlugRelatedField(
        many=True,
        queryset=Group.objects.all(),
        slug_field='name',
        write_only=True,
        required=False
    )

    groupsDisplay = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'rut', 'first_name', 'last_name',
            'password', 'password2',
            'is_active',
            'groups', 'groupsDisplay',
            'groups_names',
        ]
        read_only_fields = ('id', 'is_active')

    def get_groupsDisplay(self, obj):
        return [g.name for g in obj.groups.all()]

    def validate(self, attrs):
        pw1 = attrs.get('password')
        pw2 = attrs.get('password2')

        if pw1 != pw2:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

        try:
            if pw1 is not None:
                validate_password(pw1)
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2', None)
        groups = validated_data.pop('groups_names', [])

        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  #
        user.is_active = False       # Inactivo por defecto
        user.save()

        if groups:
            user.groups.set(groups)

        return user
