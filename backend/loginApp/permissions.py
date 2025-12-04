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
        
        user_groups_names = user.groups.values_list('name', flat= True)

        return any(group_name in self.allowed_groups for group_name in user_groups_names)
    
class IsAdminGroup(IsInGroup): # Permiso para el grupo Administrador
    allowed_groups = ['Administrador']

class IsSupervisorGroup(IsInGroup): # Permiso para el grupo Supervisor
    allowed_groups = ['Supervisor']

class IsOperatorGroup(IsInGroup): # Permiso para el grupo Operador
    allowed_groups = ['Operador']
