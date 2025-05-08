import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Productos from "./Pages/Productos"; 
import Home from "./Pages/home";
import Nosotros from "./Pages/nosotros";
import API from "./Pages/API"
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import M from "materialize-css/dist/js/materialize.min.js";


function App() {
  React.useEffect(() => {
    M.AutoInit(); // Activa tooltips, dropdowns, sidenavs, etc.
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/API" element={<API />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
