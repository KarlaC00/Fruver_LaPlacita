import React from "react";
import { useLocation } from "react-router-dom";
import imgProductos1 from "../assets/productos.jpg"; // puedes cambiar nombre si tienes más
import imgProductos2 from "../assets/frutas.jpg";
import imgProductos3 from "../assets/frutas1.jpg";
import imgProductos4 from "../assets/frutas2.jpg";

const Imagetop = () => {
  const location = useLocation();

  // Mapea rutas a variables de imagen importadas
  const images = {
    "/productos": imgProductos1,
    "/home": imgProductos2,
    "/nosotros": imgProductos3,
    "/api": imgProductos4,
  };

  const currentImage = images[location.pathname] || "";

  return (
    <div
      style={{
        height: "40vh",
        backgroundImage: `url(${currentImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(40%)",
      }}
    ></div>
  );
};

export default Imagetop;
