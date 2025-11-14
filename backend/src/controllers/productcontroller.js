import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.file ? req.file.filename : null; // solo el nombre
    const newProduct = new Product({ name, description, price, stock, category, image });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(500).json({ message: "Error creando producto" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Adjuntar la ruta completa de la imagen
    const productsWithImages = products.map((p) => ({
      ...p._doc,
      image: p.image ? `http://localhost:4500/uploads/${p.image}` : null,
    }));
    res.json(productsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo productos" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const productUpdated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!productUpdated) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(productUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto" });
  }
};
