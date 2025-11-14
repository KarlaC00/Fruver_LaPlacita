import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../auth/AuthContext";
import M from "materialize-css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Inicializar dropdown cada vez que cambia el user
  useEffect(() => {
    const elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { constrainWidth: false, coverTrigger: false });
  }, [user]);

  const mostrarRol = () => {
    if (!user) return null;
    switch (user.role) {
      case "Administrador": return "Admin activo";
      case "Vendedor": return "Vendedor activo";
      case "Cliente": return "Cliente activo";
      default: return "";
    }
  };

const handleLogout = () => {
  logout();
  window.location.href = "/home"; // fuerza recarga completa
};

  return (
    <nav className="light-green darken-4">
      <div className="">
        <div className="nav-wrapper">
          <Link to="/home" className="brand-logo">
            LA PLACITA
            <sup><span className="material-icons">storefront</span></sup>
          </Link>

          <ul className="right hide-on-med-and-down">
            {/* Enlaces públicos */}
            <li><CustomNavLink to="/home">Inicio</CustomNavLink></li>
            <li><CustomNavLink to="/productos">Productos</CustomNavLink></li>
            <li><CustomNavLink to="/nosotros">Nosotros</CustomNavLink></li>
            <li><CustomNavLink to="/api">API</CustomNavLink></li>

            {/* Dropdown Administrar (solo Admin y Vendedor) */}
            {(user?.role === "Administrador" || user?.role === "Vendedor") && (
              <>
                <li>
                  <a className="dropdown-trigger" href="#!" data-target="adminDropdown">
                    Administrar <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
                <ul id="adminDropdown" className="dropdown-content">
                  {user?.role === "Administrador" && (
                    <>
                      <li><CustomNavLink to="/adminProducto">Productos</CustomNavLink></li>
                      <li><CustomNavLink to="/empleados">Empleados</CustomNavLink></li>
                      <li><CustomNavLink to="/clientes">Clientes</CustomNavLink></li>
                    </>
                  )}
                  <li><CustomNavLink to="/Entrada">Compras</CustomNavLink></li>
                </ul>
              </>
            )}

            {/* Menú Cliente */}
            {user?.role === "Cliente" && (
              <li><CustomNavLink to="/misCompras">Mis compras</CustomNavLink></li>
            )}

            {/* Si NO hay sesión */}
            {!user && (
              <>
                <li><Link to="/registro" className="btn-round btn-register green lighten-1">Registrar</Link></li>
                <li><Link to="/login" className="btn-round btn-login green darken-2">Iniciar Sesión</Link></li>
              </>
            )}

            {/* Rol activo y cerrar sesión */}
            {user && (
              <>
                <li style={{ margin: "0 10px", fontWeight: "bold", color: "#fff" }}>
                  {mostrarRol()}
                </li>
                <li className=" btn-logout ">
                  <button className="nav-btn-logout " onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ----------- CustomNavLink -----------
const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
  >
    {children}
  </NavLink>
);

export default Navbar;
