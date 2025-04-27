import React from 'react';
import Icon from "./icon";

const Footer = () => {
  return (
    <footer className="page-footer teal light-green darken-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
          <a href="#!" className="brand-logo">
            <Icon />
            LA PLACITA
          </a>
            <p className="grey-text text-lighten-4">
              SIGUENOS
            </p>
            <a className="material-icons" id='redes'>
                facebook
              </a>
              <a className="material-icons" id='redes'>
                chat
              </a>
              <a className="material-icons" id='redes'>
              public
              </a>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Contacto</h5>
            <ul>
              <li><span className="grey-text text-lighten-3" >📍 Neiva, Huila</span></li>
              <li><span className="grey-text text-lighten-3" >📞 +57 310 000 0000</span></li>
              <li><span className="grey-text text-lighten-3" >📧 info@laplacita.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} La placita todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
