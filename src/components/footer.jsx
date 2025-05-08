import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer light-green darken-4">
      <div className="container">
        <div className="row">
          {/* Sección Logo y Redes Sociales */}
          <div className="col l6 s12">
            <div className="footer-brand">
              <span className="footer-logo">
                LA PLACITA
                <sup>
                  <span className="material-icons">storefront</span>
                </sup>
              </span>
              <p className="footer-slogan">
                Frescura y calidad en cada producto
              </p>
              <div className="social-icons">
                {/* Facebook */}
                <a href="#!" className="social-icon" aria-label="Facebook">
                  <i className="fab fa-facebook-f fa-lg"></i>
                </a>

                {/* WhatsApp */}
                <a href="#!" className="social-icon" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp fa-lg"></i>
                </a>

                {/* Instagram */}
                <a href="#!" className="social-icon" aria-label="Instagram">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>

                {/* Twitter/X */}
                <a href="#!" className="social-icon" aria-label="Twitter">
                  <i className="fab fa-x-twitter fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Sección Contacto */}
          <div className="col l4 offset-l2 s12">
            <h5 className="footer-title">Contacto</h5>
            <ul className="contact-list">
              <li>
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span>Neiva, Huila</span>
              </li>
              <li>
                <i className="fas fa-phone-alt contact-icon"></i>
                <span>+57 310 000 0000</span>
              </li>
              <li>
                <i className="fas fa-envelope contact-icon"></i>
                <span>info@laplacita.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} La Placita - Todos los derechos
          reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
