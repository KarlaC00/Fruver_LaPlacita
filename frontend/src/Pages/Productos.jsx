import React, { useState, useEffect } from "react";
import Imagetop from "../components/Imagetop";
import TarjetaProducto from "../components/productos/tarjetasproductos";
import mercadoImg from "../assets/granos.png";
import Paginacion from "../components/productos/paginacion";
import usePaginacion from "../components/productos/usePaginacion";
import Search from "../components/productos/search";
import "../styles/productos.css";
import FrutasScroll from "../components/Home/FrutasScroll";


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:4500/api/products");
        if (!res.ok) throw new Error("Error al conectar con el servidor");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  // 🔎 Filtro combinado (búsqueda + categoría)
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.name
      ?.toLowerCase()
      .includes(textoBusqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      producto.category === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

  const {
    paginaActual,
    totalPaginas,
    itemsPaginados: productosPaginados,
    cambiarPagina,
  } = usePaginacion(productosFiltrados, 8);

  if (cargando)
    return (
      <div className="center-align" style={{ marginTop: "40px" }}>
        <h5 className="light-green-text text-darken-4">
          Cargando productos...
        </h5>
      </div>
    );

  if (error)
    return (
      <div className="center-align red-text" style={{ marginTop: "40px" }}>
        <h5>{error}</h5>
      </div>
    );

  return (
    <>
      <Imagetop title="Nuestros Productos" />
      <div className="container">
        <div className="section row valign-wrapper bienvenida-section">
          <div className="col s12 m6 center-align">
            <img
              src={mercadoImg}
              alt="Mercado"
              className="responsive-img bienvenida-img"
            />
          </div>
          <div className="col s12 m6">
            <h4
              className="light-green-text text-darken-4"
              style={{ fontWeight: "bold" }}
            >
              Descubre nuestros productos frescos
            </h4>
            <p className="flow-text">
              En <strong>La Placita</strong> seleccionamos las mejores frutas para ti.
              Explora nuestra variedad de productos, conoce sus beneficios y disfruta
              calidad y sabor en cada compra.
            </p>
          </div>
        </div>

        
        <div className="row">
          <div className="col s12 m6">
            <Search onBuscar={setTextoBusqueda} />
          </div>
          <div className="col s12 m6">
            <div className="input-field">
              <select
                className="browser-default"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="Todos">Todas las categorías</option>
                <option value="Frutas">Frutas</option>
                <option value="Verduras">Verduras</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divider" style={{ margin: "20px 0" }}></div>

        <div className="row">
          {productosPaginados.map((producto) => {
            const urlImagen = producto.image
              ? producto.image.startsWith("http")
                ? producto.image
                : `http://localhost:4500/uploads/${producto.image}`
              : mercadoImg;

            return (
              <TarjetaProducto
                key={producto._id}
                nombre={producto.name}
                precio={`$${producto.price}`}
                imagen={urlImagen}
              />
            );
          })}
        </div>

        {productosPaginados.length === 0 && (
          <p
            className="center-align"
            style={{ marginTop: "20px", fontStyle: "italic" }}
          >
            No se encontraron productos.
          </p>
        )}

        {totalPaginas > 1 && (
          <div className="center-align">
            <Paginacion
              currentPage={paginaActual}
              totalPages={totalPaginas}
              onPageChange={cambiarPagina}
            />
          </div>
        )}
      </div>
      {/* Scroll de Frutas */}
        <FrutasScroll />
    </>
  );
};

export default Productos;
