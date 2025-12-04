from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsInGroup(BasePermission):
    # Permiso personalizado para verificar si el usuario pertenece a ciertos grupos
    allowed_groups = ['Administrador', 'Supervisor', 'Operador']

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False
        
        if not getattr(user, 'groups', None):
            return False
        
        if user.is_superuser:
            return True
        
        return user.groups.nombre in self.allowed_groups
    
class IsAdminGroup(BasePermission): # Permiso para el grupo Administrador
    allowed_groups = ['Administrador']

class IsSupervisorGroup(BasePermission): # Permiso para el grupo Supervisor
    allowed_groups = ['Supervisor']

class IsOperatorGroup(BasePermission): # Permiso para el grupo Operador
    allowed_groups = ['Operador']
