import React, { useEffect, useState } from "react";
import "../styles/empleados.css";

const API_URL = "http://localhost:4500/api/empleados";

const Empleados = () => {
  const [empleadosActivos, setEmpleadosActivos] = useState([]);
  const [empleadosInactivos, setEmpleadosInactivos] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    hiredate: "",
  });

  const roles = ["Administrador", "Vendedor", "Cajero", "Gerente", "Bodeguero"];

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();

      // Separar activos e inactivos
      const activos = data.filter((emp) => emp.estado === "activo");
      const inactivos = data.filter((emp) => emp.estado === "inactivo");

      setEmpleadosActivos(activos);
      setEmpleadosInactivos(inactivos);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar los empleados. Verifica el servidor.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.role || !formData.email) {
      return alert("Completa los campos obligatorios (nombre, apellido, rol, email).");
    }

    try {
      let res;
      if (editingEmpleado) {
        // actualizar
        res = await fetch(`${API_URL}/${editingEmpleado._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // crear
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      // Mostrar el mensaje real del backend si hay error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al guardar");
      }

      setEditingEmpleado(null);
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        phone: "",
        email: "",
        hiredate: "",
      });
      obtenerEmpleados();
    } catch (error) {
      console.error(error);
      alert(error.message || "Ocurrió un error al guardar. Revisa la consola.");
    }
  };

  const handleEdit = (empleado) => {
    setEditingEmpleado(empleado);
    setFormData({
      firstName: empleado.firstName || "",
      lastName: empleado.lastName || "",
      role: empleado.role || "",
      phone: empleado.phone || "",
      email: empleado.email || "",
      hiredate: empleado.hiredate ? empleado.hiredate.split("T")[0] : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingEmpleado(null);
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      phone: "",
      email: "",
      hiredate: "",
    });
  };

  //  Desactivar empleado
  const handleInactivar = async (id) => {
    if (!window.confirm("¿Seguro que deseas inactivar este empleado?")) return;
    try {
      const res = await fetch(`${API_URL}/inactivar/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Error al inactivar empleado");
      obtenerEmpleados();
    } catch (error) {
      console.error(error);
      alert("No se pudo inactivar el empleado.");
    }
  };

  // Reactivar empleado
  const handleReactivar = async (id) => {
    try {
      const res = await fetch(`${API_URL}/reactivar/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Error al reactivar empleado");
      obtenerEmpleados();
    } catch (error) {
      console.error(error);
      alert("No se pudo reactivar el empleado.");
    }
  };

  // Fecha máxima (hoy) para hiredate
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="empleados-container">
      <h2>{editingEmpleado ? "Editar Empleado" : "Agregar Empleado"}</h2>

      {/* === FORMULARIO === */}
      <form onSubmit={handleSubmit} className="empleado-form">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un rol</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="hiredate"
          value={formData.hiredate}
          onChange={handleChange}
          max={today} //no deja elegir fechas futuras
        />

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button type="submit" className="btn-edit light-green darken-3">
            {editingEmpleado ? "Actualizar" : "Agregar Empleado"}
          </button>
          {editingEmpleado && (
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

      {/* === LISTA DE EMPLEADOS ACTIVOS === */}
      <h3>Lista de Empleados Activos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha de Contratación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosActivos.length > 0 ? (
            empleadosActivos.map((empleado) => (
              <tr key={empleado._id}>
                <td>{empleado.firstName}</td>
                <td>{empleado.lastName}</td>
                <td>{empleado.role}</td>
                <td>{empleado.phone}</td>
                <td>{empleado.email}</td>
                <td>
                  {empleado.hiredate
                    ? new Date(empleado.hiredate).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(empleado)}>
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleInactivar(empleado._id)}
                  >
                    Inactivar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay empleados activos</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === HISTORIAL DE EMPLEADOS INACTIVOS === */}
      <h3 style={{ marginTop: "2rem" }}>Historial de Empleados Inactivos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha de Contratación</th>
            <th>Fecha de Despido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosInactivos.length > 0 ? (
            empleadosInactivos.map((empleado) => (
              <tr key={empleado._id}>
                <td>{empleado.firstName}</td>
                <td>{empleado.lastName}</td>
                <td>{empleado.role}</td>
                <td>{empleado.phone}</td>
                <td>{empleado.email}</td>
                <td>
                  {empleado.hiredate
                    ? new Date(empleado.hiredate).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  {empleado.fecha_despido
                    ? new Date(empleado.fecha_despido).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleReactivar(empleado._id)}
                  >
                    Reactivar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay empleados inactivos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;