import React from "react";
import Imagetop from "../components/Imagetop";
import '../styles/Nosotros.css'

const Nosotros = () => {
  return (
    <>
      <Imagetop title="Nosotros" />
      <section className="fondo-patron">
        <div className="container caja-blanca z-depth-2">
          <div className="row fila-centro">
            
            <div className="col s5 columna-izquierda">
              <span className="light-green-text text-darken-4 align center" style={{ fontWeight: "bold" }}>
                Productos frescos y <br /> saludables en tu hogar
              </span>
            </div>

            <div className="col s7 columna-derecha">
              <span className="flow-text">
                Somos una empresa 100% Colombiana, dedicada a la distribución y comercialización de frutas y verduras de la mejor calidad.<br />
                Nuestra misión es contribuir significativamente a satisfacer la demanda que tienen nuestros clientes de alimentos sanos y nutritivos.<br />
                Somos una agroindustria integral en donde cuidamos la calidad de nuestro producto desde la producción hasta que llega a su mesa.
                Nuestros productos son de una tierra bendita, donde el clima templado y las aguas puras y cristalinas de manantial alimentan los cultivos,
                para llevar a su mesa lo mejor del campo Colombiano.
              </span>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;

