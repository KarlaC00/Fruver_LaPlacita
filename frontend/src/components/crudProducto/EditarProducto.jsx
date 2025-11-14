import React, { useState } from "react";

const EditarProducto = ({ producto, onCancel, onUpdated }) => {
  const [formData, setFormData] = useState({
    ...producto,
    image: null,
  });

  const [preview, setPreview] = useState(producto.image);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    await fetch(`http://localhost:4500/api/productos/${producto._id}`, {
      method: "PUT",
      body: data,
    });

    alert("✅ Producto actualizado");
    onUpdated();
  };

  return (
    <div>
      <h4 className="center-align">Editar producto</h4>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label className="active">Nombre</label>
        </div>

        <div className="input-field">
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="active">Descripción</label>
        </div>

        <div className="input-field">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label className="active">Precio</label>
        </div>

        <div className="input-field">
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <label className="active">Stock</label>
        </div>

        <div className="input-field">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="browser-default"
          >
            <option value="Frutas">Frutas</option>
            <option value="Verduras">Verduras</option>
          </select>
        </div>

        <div className="file-field input-field">
          <div className="btn green darken-2">
            <span>Imagen</span>
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Sube una nueva imagen si quieres reemplazarla"
            />
          </div>
        </div>

        {preview && (
          <div className="center-align">
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: "120px", borderRadius: "8px" }}
            />
          </div>
        )}

        <div className="center-align" style={{ marginTop: "15px" }}>
          <button type="submit" className="btn waves-effect waves-light green darken-2">Guardar cambios</button>
          <button
            type="button"
            className="btn btn green darken-2"
            style={{ marginLeft: "10px" }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;
