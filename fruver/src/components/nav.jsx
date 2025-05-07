import React from "react";
import Icon from "./icon";
import Boton from "./boton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper light-green darken-4">
        <Link to="/home" className="brand-logo">
          <Icon />
          LA PLACITA
        </Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/home">HOME</Link></li>
          <li><Link to="/productos">PRODUCTOS</Link></li>
          <li><Link to="/nosotros">NOSOTROS</Link></li>
          <li><Link to="/api">API</Link></li>
          <li>
            <Boton texto="Acceder" textoColor="green" color="white" href="" />
          </li>
        </ul>
      </div>
      <div>
        <ul className="sidenav" id="mobile-demo">
          <li><Link to="/home">HOME</Link></li>
          <li><Link to="/productos">PRODUCTOS</Link></li>
          <li><Link to="/nosotros">NOSOTROS</Link></li>
          <li><Link to="/api">API</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
