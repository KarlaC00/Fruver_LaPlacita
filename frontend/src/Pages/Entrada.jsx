import React, { useState, useEffect } from "react";

const EntradaStockUnificada = () => {
  const [compras, setCompras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    provider: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const authHeaders = (extra = {}) => {
    const token = localStorage.getItem("token");
    return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
  };

  // 🔹 Cargar compras
  const cargarCompras = async () => {
    try {
      const res = await fetch("http://localhost:4500/api/purchases", {
        headers: authHeaders(),
      });
      const data = await res.json();
      setCompras(data);
    } catch (err) {
      console.error("Error al obtener compras:", err);
    }
  };

  // 🔹 Cargar productos
  const cargarProductos = async () => {
    try {
      const res = await fetch("http://localhost:4500/api/products");
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  useEffect(() => {
    cargarCompras();
    cargarProductos();
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar nueva entrada
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!formData.product_id || !formData.quantity || !formData.provider) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4500/api/purchases", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al crear la entrada");

      const nuevaCompra = await res.json();
      setCompras([...compras, nuevaCompra]);
      setMostrarModal(false);
      setFormData({ product_id: "", provider: "", quantity: "" });
      setMensaje("Entrada de stock creada correctamente ✅");
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar la entrada");
    }
  };

  return (
    <div className="container">
      <h3 className="light-green-text text-darken-4" style={{ marginTop: "20px" }}>
        Entradas de Stock
      </h3>

      {/* 🔘 Botón para abrir modal */}
      <button
        className="btn light-green darken-3"
        style={{ marginBottom: "20px" }}
        onClick={() => setMostrarModal(true)}
      >
        ➕ Nueva Entrada
      </button>

      {/* 🧾 Tabla de entradas */}
      <table className="highlight centered responsive-table">
        <thead>
          <tr>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Producto</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Proveedor</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Cantidad</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Precio Unitario</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {compras.length > 0 ? (
            compras.map((compra) => (
              <tr key={compra._id}>
                <td>{compra.product_id?.name || "Desconocido"}</td>
                <td>{compra.provider}</td>
                <td>{compra.quantity}</td>
                <td>${compra.unit_price}</td>
                <td>${compra.subtotal}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay entradas de stock registradas.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mensaje && <p className="green-text center-align">{mensaje}</p>}

      {error && <p className="red-text center-align">{error}</p>}

      {/* 🧩 Modal para crear nueva entrada */}
      {mostrarModal && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h5>Nueva Entrada de Stock</h5>

            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <select
                  className="browser-default"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🔹 Proveedor */}
              <div className="input-field">
                <input
                  type="text"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  required
                />
                <label className={formData.provider ? "active" : ""}>Proveedor</label>
              </div>

              {/* 🔹 Cantidad */}
              <div className="input-field">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                />
                <label className={formData.quantity ? "active" : ""}>Cantidad</label>
              </div>

              <div className="center-align" style={{ marginTop: "20px" }}>
                <button type="submit" className="btn light-green darken-3">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn red darken-2"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
              </div>

              {error && <p className="red-text center-align">{error}</p>}
              {mensaje && <p className="green-text center-align">{mensaje}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntradaStockUnificada;
