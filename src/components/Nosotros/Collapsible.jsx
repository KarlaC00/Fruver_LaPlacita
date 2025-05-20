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
    <div className="collapsible-wrapper center-align">
      <ul className="collapsible horizontal-cards" style={{ display: 'flex', justifyContent: 'center' }}>
        <li className="collapsible-card" style={{ margin: '0 10px', width: '300px' }}>
          <div className="collapsible-header">
            <i className="material-icons">eco</i>
            Misión
          </div>
          <div className="collapsible-body">
            <span>
                    Contribuir significativamente a satisfacer la demanda de alimentos sanos y nutritivos en los hogares colombianos, 
                    mediante la distribución de productos frescos, de excelente calidad, cultivados con responsabilidad ambiental y social. 
                    Nos enfocamos en ofrecer una experiencia de consumo saludable, promoviendo el bienestar y la confianza de nuestros clientes 
                    en cada etapa de nuestro proceso de producción y comercialización.
            </span>
          </div>
        </li>
        <li className="collapsible-card" style={{ margin: '0 10px', width: '300px' }}>
          <div className="collapsible-header">
            <i className="material-icons">local_florist</i>
            Visión
          </div>
          <div className="collapsible-body">
            <span>
                Ser líderes en el mercado nacional de frutas y verduras, reconocidos por nuestra excelencia en la calidad de productos 
                y servicios. Aspiramos a consolidar una red de distribución sostenible que beneficie tanto a productores como a consumidores, 
                impulsando el desarrollo agrícola del país y fortaleciendo nuestra presencia en los hogares colombianos con alimentos 
                confiables, nutritivos y de origen responsable.
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CollapsibleNosotros;

