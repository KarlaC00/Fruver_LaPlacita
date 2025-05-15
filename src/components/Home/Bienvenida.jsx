import React from "react";
import mercadoImg from "../../assets/mercado.png";
import "../../styles/Bienvenida.css";

const Bienvenida = ({ onVerProductos }) => {
  return (
    <div className="section row valign-wrapper bienvenida-section">
      {/* Columna de texto */}
      <div className="col s12 m6">
        <h4 className="light-green-text text-darken-4" style={{ fontWeight: "bold" }}>
          Frescura y calidad directamente a tu mesa
        </h4>
        <p className="flow-text">
          En <strong>La Placita</strong>, nos especializamos en ofrecer los mejores productos del campo, 
          con atención personalizada y un ambiente que te hará sentir como en casa.
        </p>
        <p className="flow-text">
          Valoramos el trabajo duro de nuestros agricultores locales y apoyamos el comercio justo. 
          Cada producto proviene de fuentes sostenibles, y nuestro equipo siempre está listo para ayudarte.
        </p>
        <button className="btn light-green darken-3" onClick={onVerProductos} style={{ marginTop: "10px" }}>
          Ver Productos
          <i className="material-icons right">shopping_cart</i>
        </button>
      </div>

      {/* Columna de imagen */}
      <div className="col s12 m6 center-align">
        <img src={mercadoImg} alt="Mercado" className="responsive-img bienvenida-img" />
      </div>
    </div>
  );
};

export default Bienvenida;
