import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
// import DashboardAdmin from "./pages/DashboardAdmin";
// import DashboardSupervisor from "./pages/DashboardSupervisor";
// import DashboardBodeguero from "./pages/DashboardBodeguero";
import SinPermiso from "./pages/SinPermiso.jsx";
import HomePublic from "./pages/HomePublic.jsx";
// import HomePublic from "./pages/HomePublic";

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
            <Route path="/dashboard" element={<HomePublic />} />
            {/* Ejemplo: panel general accesible a cualquiera logueado */}
            {/* <Route path="/panel" element={<PanelGeneral />} /> */}
          </Route>
          {/* Rutas SOLO ADMIN */}
          <Route element={<ProtectedRoute roles={["Administrador"]} />}>
            {/* <Route path="/admin" element={<DashboardAdmin />} /> */}
          </Route>

          {/* Rutas SOLO SUPERVISOR */}
          <Route element={<ProtectedRoute roles={["Supervisor"]} />}>
            {/* <Route path="/supervisor" element={<DashboardSupervisor />} /> */}
          </Route>

          {/* Rutas SOLO BODEGUERO */}
          <Route element={<ProtectedRoute roles={["Operador"]} />}>
            {/* <Route path="/bodega" element={<DashboardBodeguero />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
