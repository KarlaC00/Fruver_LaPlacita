import React from "react";
import Imagetop from "../components/Imagetop";
import { CardHome } from "../components/Home/cardHome";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <Imagetop title="¡Bienvenidos a la Placita!" />
      <div className="card-container-with-bg">
        <div className="row card-center ">
          <CardHome
            title="Frutas y Verduras"
            description="Descubre lo mejor de la temporada. ¡Productos frescos, locales y llenos de sabor directos a tu mesa!"
          />
          <CardHome
            title="Total de la Compra"
            description="Revisa y gestiona tu canasta fácilmente. ¿Listo para disfrutar de tu pedido?"
          />
          <CardHome
            title="Revisa tu Factura"
            description="Transparencia en cada compra. Descarga o comparte tu factura con un solo clic."
          />
        </div>
      </div>
    </>
  );
};

export default Home;
