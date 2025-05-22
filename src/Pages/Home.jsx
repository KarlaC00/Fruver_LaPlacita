import React from "react";
import Imagetop from "../components/Imagetop";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { CardHome } from "../components/Home/CardHome";
import Testimonios from "../components/Home/Testimonios";
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
            description="Frutas y verduras seleccionadas cuidadosamente para tu bienestar diario."
            boton="Nuestros Productos"
            path="/productos"
          />
          <CardHome
            icon="monitor_heart"
            title="Información Nutricional"
            description="Descubre el valor nutricional completo de cada alimento que consumes."
            boton="API de nutrición"
            path="/api"
          />
          <CardHome
            icon="spa"
            title="Apoyo al Campo"
            description="Trabajamos directamente con agricultores locales para ofrecerte lo mejor."
            boton="Sobre Nosotros"
            path="/nosotros"
          />
        </div>

        {/* Sección de Bienvenida */}
        <Bienvenida />

        {/* Testimonios */}
        <Testimonios />
      </div>
    </>
  );
};

export default Home;