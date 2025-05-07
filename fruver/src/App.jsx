import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Productos from "./Pages/Productos"; 
import Home from "./Pages/home";
import Imagetop from "./components/imagetop";
import Nosotros from "./Pages/nosotros";
import API from "./Pages/API"

function App() {
  return (
    <>
      <Navbar />
      <Imagetop />
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
