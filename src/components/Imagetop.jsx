import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/ImageTop.css";
import imgProductos1 from "../assets/productos.jpg";
import imgProductos2 from "../assets/frutas.jpg";
import imgProductos3 from "../assets/frutas1.jpg";
import imgProductos4 from "../assets/frutas2.jpg";

const Imagetop = ({ title = "", height = "40vh", brightness = 40 }) => {
  const location = useLocation();

  const routeImages = {
    "/productos": imgProductos1,
    "/home": imgProductos2,
    "/nosotros": imgProductos3,
    "/api": imgProductos4,
  };

  const currentImage = routeImages[location.pathname] || imgProductos1;

  return (
    <div
      className="image-top-container valign-wrapper"
      style={{ height: height }} // Sobrescribe la altura desde las props
    >
      <div
        className="image-background"
        style={{
          backgroundImage: `url(${currentImage})`,
          filter: `brightness(${brightness}%)`,
        }}
      ></div>

      {title && (
        <div className="container">
          <h2 className="image-title white-text">{title}</h2>
        </div>
      )}
    </div>
  );
};

export default Imagetop;
