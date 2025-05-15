import React from "react";
import Imagetop from "../components/Imagetop";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { CardHome } from "../components/Home/CardHome";
import Testimonios from "../components/Home/Testimonios";
import { Navigate } from "react-router-dom";
import FrutasScroll from "../components/Home/FrutasScroll";

import "../styles/Home.css";
import Bienvenida from "../components/Home/Bienvenida";

const Home = () => {
  return (
    <>
      <Imagetop
        title="Bienvenidos a La Placita"
        height="60vh"
        brightness={50}
      />

      <div className="container">
        {/* Tarjetas de Información */}
        <div className="row">
          <CardHome
            icon="local_florist"
            title="Productos Frescos"
            description="Frutas y verduras seleccionadas a diario para ti."
            boton="Nuestros Productos"
          />
          <CardHome
            icon="support_agent"
            title="Atención Personalizada"
            description="Nuestro equipo está comprometido en brindarte una gran experiencia."
            boton="API de atención"
          />
          <CardHome
            icon="spa"
            title="Apoyo al Campo"
            description="Apoyamos a agricultores locales garantizando calidad y comercio justo."
            boton="Sobre Nosotros"
          />
        </div>

        {/* Sección de Bienvenida */}
        <Bienvenida onVerProductos={() => navigate("/productos")} />

        {/* Testimonios */}
        <Testimonios />
      </div>

    </>
  );
};

export default Home;
