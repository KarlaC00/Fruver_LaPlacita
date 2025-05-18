import React, { useState } from "react";
import Search from "../components/productos/search";
import Imagetop from "../components/Imagetop";
import TarjetaProducto from "../components/productos/tarjetasproductos";
import CheckboxFrutas from "../components/productos/checkbox";
import {
  frutasCitricas,
  frutasTropicales,
} from "../components/productos/datos";
import Paginacion from "../components/productos/paginacion";
import usePaginacion from "../components/productos/usePaginacion";
import "../styles/productos.css";

const Productos = () => {
  const [frutasMostradas, setFrutasMostradas] = useState([
    ...frutasCitricas,
    ...frutasTropicales,
  ]);

  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Filtrado por búsqueda
  const frutasFiltradas = frutasMostradas.filter((fruta) =>
    fruta.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  // Hook de paginación
  const {
    paginaActual,
    totalPaginas,
    itemsPaginados: frutasPaginadas,
    cambiarPagina,
    setPaginaActual,
  } = usePaginacion(frutasFiltradas, 8);

  const handleFrutasChange = (frutas) => {
    setFrutasMostradas(frutas);
    setPaginaActual(1);
  };

  return (
    <>
      <Imagetop title="Nuestros Productos" />
      <div className="container">
        <div className="usda-intro section container">
          <h5
            className="center-align light-green-text text-darken-3"
            style={{ fontWeight: "bold" }}
          >
            Descubre nuestros productos frescos y saludables
          </h5>
          <p className="flow-text center-align">
            En <strong>La Placita</strong> seleccionamos las mejores frutas para
            ti. Explora nuestra variedad de productos, conoce sus beneficios y
            elige lo mejor para tu alimentación diaria. ¡Disfruta calidad y
            sabor en cada bocado!
          </p>
        </div>
        <Search onBuscar={setTextoBusqueda} />

        <div className="divider" style={{ margin: "20px 0" }}></div>

        <div className="row" style={{ padding: "1% 0" }}>
          {/* Columna con checkboxes (1/4) */}
          <div className="col s12 m4 l3">
            <CheckboxFrutas onChangeFrutas={handleFrutasChange} />
          </div>

          {/* Columna con tarjetas y paginación (3/4) */}
          <div className="col s12 m8 l9">
            <div className="row">
              {frutasPaginadas.map((fruta, index) => (
                <TarjetaProducto key={index} {...fruta} />
              ))}
            </div>

            {frutasPaginadas.length === 0 && (
              <p
                className="center-align"
                style={{ marginTop: "20px", fontStyle: "italic" }}
              >
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            )}

            {totalPaginas > 1 && (
              <div className="center-align">
                <Paginacion
                  currentPage={paginaActual}
                  totalPages={totalPaginas}
                  onPageChange={cambiarPagina}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;
