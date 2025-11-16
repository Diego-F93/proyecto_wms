import React, { createContext, useContext, useState, useEffect } from "react"; // Contexto de autenticación

const AuthContext = createContext(null);

// Componente proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);        // { id, email, role, ... }
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión desde localStorage al recargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access");
    const storedRefreshToken = localStorage.getItem("refresh");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();

    // Ajusta estos nombres a tu API
    const token = data.access;
    const loggedUser = data.user;

    setAccessToken(token);
    setUser(loggedUser);

    // Guardar en localStorage 
    localStorage.setItem("access", token);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  };

  const hasRole = (roles = []) => {
    if (!user || !user.groups) return false;
    if (roles.length === 0) return true; // si no se pasa nada, solo requiere estar logueado
    return user.groups.some(group => roles.includes(group));
  };

  const value = {
    user,
    accessToken,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}