import React, { useEffect, useState } from "react";
import "../styles/clientes.css";

const API_URL = "http://localhost:4500/api/clientes"; // ajusta el puerto según tu backend

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
  });

  // Cargar los clientes al inicio
  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener clientes");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar los clientes. Verifica el servidor.");
    }
  };

  // Manejo de inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear o actualizar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.telefono || !formData.direccion) {
      return alert("Completa todos los campos antes de guardar.");
    }

    try {
      let res;
      if (editingCliente) {
        // Actualizar cliente existente
        res = await fetch(`${API_URL}/${editingCliente._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Crear nuevo cliente
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error desconocido" }));
        throw new Error(err.message || "Error en la solicitud");
      }

      setFormData({ nombre: "", telefono: "", direccion: "", correo: "" });
      setEditingCliente(null);
      obtenerClientes();
    } catch (error) {
      console.error(error);
      alert(error.message || "Ocurrió un error al guardar el cliente.");
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      correo: cliente.correo,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingCliente(null);
    setFormData({ nombre: "", telefono: "", direccion: "", correo: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      obtenerClientes();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el cliente.");
    }
  };

  return (
    <div className="clientes-container">
      <h2>{editingCliente ? "Editar Cliente" : "Agregar Cliente"}</h2>

      <form onSubmit={handleSubmit} className="cliente-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit" className="btn-edit light-green darken-3">
            {editingCliente ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
          {editingCliente && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{ background: "gray" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Lista de Clientes</h3>
      <table>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Nombre</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Teléfono</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Dirección</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Correo</th>
            <th style={{ backgroundColor: "#689f38", color: "white" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.correo}</td>
                <td>
                  <button
                    className="btn-edit light-green darken-3"
                    onClick={() => handleEdit(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(cliente._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay clientes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
