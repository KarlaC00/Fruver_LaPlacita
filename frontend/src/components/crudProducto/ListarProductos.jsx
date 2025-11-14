import React from "react";

const ListaProductos = ({ productos, onEdit, onDeleted }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    await fetch(`http://localhost:4500/api/productos/${id}`, {
      method: "DELETE",
    });

    alert("🗑️ Producto eliminado");

    if (onDeleted) onDeleted(); 
  };

  return (
    <div>
      <h4 className="center-align ">Lista de productos</h4>
      <table className="highlight centered ">
        <thead >
          <tr>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Imagen</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Nombre</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Precio</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Categoría</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No se encontraron productos.
              </td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "60px", borderRadius: "6px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    className="btn-small green darken-2"
                    onClick={() => onEdit(p)}
                    style={{ marginRight: "5px" }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-small red"
                    onClick={() => handleDelete(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
