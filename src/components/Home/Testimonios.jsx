import React from "react";
import "../../styles/Testimonios.css";

const testimonios = [
  {
    nombre: "Ana María",
    mensaje: "Siempre encuentro productos frescos y el trato es excelente.",
    calificacion: 5,
  },
  {
    nombre: "Juan Carlos",
    mensaje: "La Placita me encanta, apoyo local y buena calidad.",
    calificacion: 4,
  },
  {
    nombre: "Luisa Fernanda",
    mensaje: "Fácil de usar, rápido y confiable. Mi fruver favorito.",
    calificacion: 5,
  },
];

const Testimonios = () => {
  return (
    <div className="section center-align">
      <h5
        className="light-green-text text-darken-4"
        style={{ fontWeight: "bold" }}
      >
        Nuestros Testimonios
      </h5>
      <div className="row">
        {testimonios.map((t, index) => (
          <div className="col s12 m4" key={index}>
            <div className="card-panel testimonial-panel z-depth-1">
              <div className="testimonial-header">
                <i className="material-icons testimonial-icon">
                  account_circle
                </i>
                <span className="testimonial-name">{t.nombre}</span>
              </div>
              <p className="testimonial-message">"{t.mensaje}"</p>
              <div className="testimonial-stars">
                {Array.from({ length: t.calificacion }).map((_, i) => (
                  <i
                    key={i}
                    className="material-icons yellow-text text-darken-2"
                  >
                    star
                  </i>
                ))}
                {Array.from({ length: 5 - t.calificacion }).map((_, i) => (
                  <i key={i} className="material-icons grey-text">
                    star_border
                  </i>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonios;
