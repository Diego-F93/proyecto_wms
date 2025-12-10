import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import SinPermiso from "./pages/SinPermiso.jsx";
import HomePublic from "./pages/HomePublic.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          {/* Rutas protegidas genéricas (solo requiere estar logueado) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<HomePublic />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
