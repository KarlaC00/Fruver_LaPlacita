import React from "react";
import Search from "../components/productos/search";
import Imagetop from "../components/Imagetop";

const Productos = () => {
  return (
    <>
      <Imagetop title="Nuestros Productos" />
      <div>
        <Search />
      </div>
    </>
  );
};

export default Productos;
