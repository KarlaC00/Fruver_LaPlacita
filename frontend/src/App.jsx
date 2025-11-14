import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import M from "materialize-css/dist/js/materialize.min.js";

// Páginas
import Home from "./Pages/Home";
import Productos from "./Pages/Productos";
import Nosotros from "./Pages/nosotros";
import API from "./Pages/API";
import AdminProducto from "./Pages/AdminProducto";
import Entrada from "./Pages/Entrada";
import Empleados from "./Pages/Empleados";
import Clientes from "./Pages/Clientes";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import NoAutorizado from "./Pages/NoAutorizado";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/api" element={<API />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/no-autorizado" element={<NoAutorizado />} />

          {/* Rutas protegidas */}
          <Route
            path="/adminProducto"
            element={
              <PrivateRoute roles={["Administrador", "Vendedor"]}>
                <AdminProducto />
              </PrivateRoute>
            }
          />
          <Route
            path="/empleados"
            element={
              <PrivateRoute roles={["Administrador", "Vendedor"]}>
                <Empleados />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute roles={["Administrador", "Vendedor"]}>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/entrada"
            element={
              <PrivateRoute roles={["Administrador", "Vendedor"]}>
                <Entrada />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
