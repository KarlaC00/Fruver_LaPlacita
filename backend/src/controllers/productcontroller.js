import Product from '../models/Product.js';

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Listar todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productUpdated)
      return res.status(404).json({ message: "Product not found" });

    res.json(productUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);

    if (!productDeleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
