import mongoose from "mongoose";
import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";

// Crear una nueva compra
export const createPurchase = async (req, res) => {
  try {
    const { product_id, quantity, provider } = req.body;

    // 🔹 Validación 1: Campos obligatorios
    if (!product_id || !quantity || !provider) {
      return res.status(400).json({ message: "Todos los campos son obligatorios (product_id, quantity, provider)" });
    }

    // 🔹 Validación 2: ID de producto válido
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    // 🔹 Validación 3: quantity numérica y positiva
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "La cantidad debe ser un número mayor a 0" });
    }

    // 🔹 Validación 4: Verificar que el producto exista
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Cálculo de subtotal
    const unit_price = product.price;
    const subtotal = quantity * unit_price;

    // Crear nueva compra
    const newPurchase = new Purchase({
      product_id,
      provider: provider.trim(),
      quantity,
      unit_price,
      subtotal,
    });

    const purchaseSaved = await newPurchase.save();

    // Actualizar stock del producto
    product.stock += quantity;
    await product.save();

    res.status(201).json({
      message: "Compra registrada exitosamente",
      data: purchaseSaved
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la compra" });
  }
};

// Obtener todas las compras
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("product_id", "name price");

    if (!purchases || purchases.length === 0) {
      return res.status(404).json({ message: "No se encontraron compras" });
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las compras" });
  }
};

// Obtener una compra por ID
export const getPurchase = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 Validar ID de compra
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de compra inválido" });
    }

    const purchase = await Purchase.findById(id)
      .populate("product_id", "name price");

    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la compra" });
  }
};
