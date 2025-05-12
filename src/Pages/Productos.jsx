import React, { useState } from "react";
import Search from "../components/productos/search";
import Imagetop from "../components/Imagetop";
import TarjetaProducto from "../components/productos/tarjetasproductos";
import CheckboxFrutas from "../components/productos/checkbox";
import { frutasCitricas, frutasTropicales } from "../components/productos/datos"; 
import Paginacion from "../components/productos/paginacion";
import '../styles/productos.css'

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

  const handleFrutasChange = (frutas) => {
    setFrutasMostradas(frutas);
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
          <div style={{ flex: 5 }}>
            <div className="row">
              {frutasFiltradas.map((fruta, index) => (
                <TarjetaProducto key={index} {...fruta} />
              ))}
            </div>
            <Paginacion/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;