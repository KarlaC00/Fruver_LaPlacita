import React, { useEffect } from 'react';
import M from 'materialize-css';

const CollapsibleNosotros = () => {
  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {
      accordion: false,
    });
  }, []);

  return (
    <div className="container section">
      <h4 className="center-align" style={{ fontWeight: "bold" }}>Sobre Nosotros</h4>
      <ul className="collapsible popout z-depth-1">
        
        <li className="hoverable">
          <div className="collapsible-header blue-text text-darken-2">
            <i className="material-icons">eco</i>
            Misión
          </div>
          <div className="collapsible-body">
            <span className="flow-text">
              Contribuir significativamente a satisfacer la demanda de alimentos sanos y nutritivos en los hogares colombianos, 
              mediante la distribución de productos frescos, de excelente calidad, cultivados con responsabilidad ambiental y social. 
              Nos enfocamos en ofrecer una experiencia de consumo saludable, promoviendo el bienestar y la confianza de nuestros clientes 
              en cada etapa de nuestro proceso de producción y comercialización.
            </span>
          </div>
        </li>

        <li className="hoverable">
          <div className="collapsible-header green-text text-darken-2">
            <i className="material-icons">local_florist</i>
            Visión
          </div>
          <div className="collapsible-body">
            <span className="flow-text">
              Ser líderes en el mercado nacional de frutas y verduras, reconocidos por nuestra excelencia en la calidad de productos 
              y servicios. Aspiramos a consolidar una red de distribución sostenible que beneficie tanto a productores como a consumidores, 
              impulsando el desarrollo agrícola del país y fortaleciendo nuestra presencia en los hogares colombianos con alimentos 
              confiables, nutritivos y de origen responsable.
            </span>
          </div>
        </li>

        <li className="hoverable">
          <div className="collapsible-header amber-text text-darken-2">
            <i className="material-icons">history</i>
            Historia
          </div>
          <div className="collapsible-body">
            <span className="flow-text">
              Nuestra empresa nació en el año 2015 como un pequeño emprendimiento familiar en el corazón del Huila. 
              Con esfuerzo y dedicación, fuimos creciendo y ganando la confianza de nuestros clientes gracias a la calidad de nuestros productos 
              y el compromiso con el bienestar de las familias colombianas. Hoy contamos con una red sólida de distribución y seguimos trabajando 
              con el mismo amor con el que iniciamos.
            </span>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default CollapsibleNosotros;
