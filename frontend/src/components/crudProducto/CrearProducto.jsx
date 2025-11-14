import React, { useState } from "react";

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Frutas",
    image: null,
  });

  const [preview, setPreview] = useState(null);

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

  try {
    const res = await fetch("http://localhost:4500/api/products", {
      method: "POST",
      body: data,
    });

    const producto = await res.json();
    console.log("✅ Producto creado:", producto);
    alert("✅ Producto creado con éxito");

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "Frutas",
      image: null,
    });
    setPreview(null);
    e.target.reset();
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    alert("❌ Error al crear producto");
  }
};

  return (
    <div className="container" style={{ marginTop: "40px", maxWidth: "600px" }}>
      <h4 className="center-align">Agregar nuevo producto</h4>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className={formData.name ? "active" : ""}>
            Nombre del producto
          </label>
        </div>

        <div className="input-field">
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="description" className={formData.description ? "active" : ""}>
            Descripción
          </label>
        </div>

        <div className="input-field">
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="price" className={formData.price ? "active" : ""}>
            Precio
          </label>
        </div>

        <div className="input-field">
          <input
            id="stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <label htmlFor="stock" className={formData.stock ? "active" : ""}>
            Stock
          </label>
        </div>

        {/* 👇 Selector de categoría */}
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

        {/* 👇 Campo imagen */}
        <div className="file-field input-field">
          <div className="btn green darken-2">
            <span>Imagen</span>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Sube una imagen del producto"
            />
          </div>
        </div>

        {/* 👇 Vista previa */}
        {preview && (
          <div className="center-align" style={{ marginBottom: "20px" }}>
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: "150px", borderRadius: "10px", marginTop: "10px" }}
            />
          </div>
        )}

        <div className="center-align">
          <button type="submit" className="btn waves-effect waves-light green darken-2">
            Crear producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProducto;
