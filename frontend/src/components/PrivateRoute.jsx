import React from "react";
import { Navigate } from "react-router-dom";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente hijo
 * @param {Array} props.roles - Lista de roles autorizados (["admin"], ["empleado", "admin"], etc.)
 */
const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Si no hay token → enviar al login
  if (!token) return <Navigate to="/login" replace />;

  // Si el rol no está autorizado → página de acceso denegado
  if (roles && !roles.includes(userRole))
    return <Navigate to="/no-autorizado" replace />;

  // Si todo está bien → renderiza el contenido
  return children;
};

export default PrivateRoute;


