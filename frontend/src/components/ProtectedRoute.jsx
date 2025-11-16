import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// roles: array ["Administrador", "Supervisor", "Operador"]
export default function ProtectedRoute({ roles = [] }) {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    // autenticado pero sin permisos
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}