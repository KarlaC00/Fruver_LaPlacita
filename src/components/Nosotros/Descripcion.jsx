import React from "react";
import "../../styles/Nosotros.css";
import mercadoImg from "../../assets/vision.png";

const Descripcion = () => {
  return (
    <>
      <section className="fondo-patron">
        <div className="container caja-blanca z-depth-2">
          <div className="row fila-centro">
            {/* Columna izquierda con texto e imagen */}
            <div className="col s12 m5 columna-izquierda ">
              <div className="center-align">
                <h5
                  className="light-green-text text-darken-4"
                  style={{ fontWeight: "bold" }}
                >
                  Productos frescos y <br /> saludables en tu hogar
                </h5>
                <img
                  src={mercadoImg}
                  alt="Mercado"
                  className="responsive-img bienvenida-img"
                  style={{ maxHeight: "250px", marginTop: "20px" }}
                />
              </div>
            </div>

            {/* Columna derecha con descripción */}
            <div className="col s12 m7 columna-derecha ">
              <p className="flow-text">
                Somos una empresa <strong>100% Colombiana</strong>, dedicada a
                la distribución y comercialización de frutas y verduras de la
                mejor calidad.
              
                Nuestra misión es contribuir significativamente a satisfacer la
                demanda que tienen nuestros clientes de{" "}
                <strong>alimentos sanos y nutritivos</strong>.<br />
                
                Somos una <strong>agroindustria integral</strong> que cuida la
                calidad del producto desde la producción hasta que llega a su
                mesa. Nuestros productos son de una <em>tierra bendita</em>,
                donde el clima templado y las aguas puras y cristalinas
                alimentan los cultivos, para llevar a su mesa lo mejor del campo
                colombiano.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Descripcion;
