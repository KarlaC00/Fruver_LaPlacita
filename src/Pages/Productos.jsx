import React, { useState } from "react";
import Search from "../components/productos/search";
import Imagetop from "../components/Imagetop";
import TarjetaProducto from "../components/productos/tarjetasproductos";
import CheckboxFrutas from "../components/productos/checkbox";
import { frutasCitricas, frutasTropicales } from "../components/productos/datos"; 
import Paginacion from "../components/productos/paginacion";
import usePaginacion from "../components/productos/usePaginacion";
import '../styles/productos.css';

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
      <div>
        <Search onBuscar={setTextoBusqueda} />
        <div>
          <hr/>
        </div>
        <div style={{ display: "flex", padding: "1%" }}>
          <div style={{ flex: 1 }}>
            <CheckboxFrutas onChangeFrutas={handleFrutasChange} />
          </div>
          <div style={{ flex: 3 }}>
            <div className="row">
              {frutasPaginadas.map((fruta, index) => (
                <TarjetaProducto key={index} {...fruta} />
              ))}
            </div>
            {totalPaginas > 1 && (
              <div className="center">
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
