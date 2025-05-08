import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="light-green darken-4">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/home" className="brand-logo">
            LA PLACITA
            <sup>
              <span className="material-icons">storefront</span>
            </sup>
          </Link>

          <ul className="right hide-on-med-and-down">
            <li>
              <CustomNavLink to="/home">Inicio</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/productos">Productos</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/nosotros">Nosotros</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/api">API</CustomNavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Componente auxiliar para aplicar estilos correctamente
const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `nav-link ${isActive ? "active-link" : ""}`
      }
    >
      {children}
    </NavLink>
  );
};

export default Navbar;