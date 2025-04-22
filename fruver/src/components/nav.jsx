import React from "react";
import Icon from "./icon";
import  Boton from "./boton";

const Navbar = () => {
  return (
    <nav>
    <div class="nav-wrapper light-green darken-4">
        <a href="#!" className="brand-logo">
        <Icon />
          LA PLACITA
        </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">HOME</a></li>
        <li><a href="badges.html">PRODUCTOS</a></li>
        <li><a href="collapsible.html">NOSOTROS</a></li>
        <li><a href="mobile.html">API</a></li>
        <li><Boton /></li>
      </ul>
    </div>
    <div>
      <ul class="sidenav" id="mobile-demo">
        <li><a href="sass.html">HOME</a></li>
        <li><a href="badges.html">PRODUCTOS</a></li>
        <li><a href="collapsible.html">NOSOTROS</a></li>
        <li><a href="mobile.html">API</a></li>
      </ul>
    </div>
  </nav>          
  
  );
}

export default Navbar;

