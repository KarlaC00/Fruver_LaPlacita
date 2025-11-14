import React, { useState, useEffect } from "react";
import CrearProducto from "../components/crudProducto/CrearProducto";
import EditarProducto from "../components/crudProducto/EditarProducto";
import ListaProductos from "../components/crudProducto/ListarProductos";
import Search from "../components/productos/search";
import usePaginacion from "../components/productos/usePaginacion";
import Paginacion from "../components/productos/paginacion";

const ProductosCRUD = () => {
  const [modo, setModo] = useState("lista"); // 'lista' | 'crear' | 'editar'
  const [productoEditando, setProductoEditando] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [productos, setProductos] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

 useEffect(() => {
  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token'); // ← Ya tienes el token aquí
      
      console.log("🔑 Token encontrado:", token ? "SÍ" : "NO"); // Para debug
      
      const res = await fetch("http://localhost:4500/api/products", {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
      
      console.log("📡 Status de respuesta:", res.status); // Para debug
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("No autorizado - Token inválido");
        }
        throw new Error(`Error ${res.status} al cargar productos`);
      }
      
      const data = await res.json();
      console.log("✅ Productos recibidos:", data); // Para ver qué recibes
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error("❌ Error al obtener productos:", err);
      setError(err.message);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };
  fetchProductos();
}, [refresh]);

  // 🔎 Filtrar productos por búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.name
      ?.toLowerCase()
      .includes(textoBusqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      producto.category === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  // 🔹 Paginación
  const { paginaActual, totalPaginas, itemsPaginados, cambiarPagina } =
    usePaginacion(productosFiltrados, 2);

  const handleEdit = (producto) => {
    setProductoEditando(producto);
    setModo("editar");
  };

  const handleUpdated = () => {
    setRefresh(!refresh);
    setModo("lista");
    setProductoEditando(null);
  };

  const handleCancel = () => {
    setModo("lista");
    setProductoEditando(null);
  };

  const handleCreated = () => {
    setRefresh(!refresh);
    setModo("lista");
  };

  if (cargando)
    return (
      <div className="center-align" style={{ marginTop: "40px" }}>
        <h5 className="light-green-text text-darken-4">
          Cargando productos...
        </h5>
      </div>
    );

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h3 className="center-align">Gestión de Productos</h3>

      {modo === "lista" && (
        <>
          {/* Botón Crear Producto */}
          <div className="center-align" style={{ marginBottom: "20px" }}>
            <button
              className="btn green darken-2"
              onClick={() => setModo("crear")}
            >
              ➕ Agregar producto
            </button>
          </div>

          {/* Buscador y filtro */}
          <div className="row" style={{ marginBottom: "20px" }}>
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
                  <option value="Granos">Granos</option>
                  <option value="Tubérculos">Tubérculos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          {productosFiltrados.length > 0 ? (
            <>
              <ListaProductos
                onEdit={handleEdit}
                productos={itemsPaginados}
                onDeleted={() => setRefresh(!refresh)}
                key={refresh}
              />

              {/* Paginación */}
              {totalPaginas > 1 && (
                <div className="center-align" style={{ marginTop: "20px" }}>
                  <Paginacion
                    currentPage={paginaActual}
                    totalPages={totalPaginas}
                    onPageChange={cambiarPagina}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="center-align" style={{ marginTop: "20px" }}>
              <p className="grey-text">
                {error ? error : "No hay productos disponibles."}
              </p>
            </div>
          )}
        </>
      )}

      {/* Crear Producto */}
      {modo === "crear" && (
        <>
          <button
            className="btn green"
            style={{ marginBottom: "20px" }}
            onClick={handleCancel}
          >
            ← Volver a lista
          </button>
          <CrearProducto onCreated={handleCreated} />
        </>
      )}

      {/* Editar Producto */}
      {modo === "editar" && productoEditando && (
        <>
          <button
            className="btn green"
            style={{ marginBottom: "20px" }}
            onClick={handleCancel}
          >
            ← Volver a lista
          </button>
          <EditarProducto
            producto={productoEditando}
            onCancel={handleCancel}
            onUpdated={handleUpdated}
          />
        </>
      )}
    </div>
  );
};

export default ProductosCRUD;
