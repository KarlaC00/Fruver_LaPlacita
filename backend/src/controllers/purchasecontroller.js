import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";

export const createPurchase = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const unit_price = product.price;
    const subtotal = quantity * unit_price;

    const newPurchase = new Purchase({
      product_id,
      quantity,
      unit_price,
      subtotal
    });

    const purchaseSaved = await newPurchase.save();

    product.stock -= quantity;
    await product.save();

    res.status(201).json(purchaseSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating purchase" });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("product_id", "name price");
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching purchases" });
  }
};

export const getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate("product_id", "name price");
    if (!purchase) return res.status(404).json({ message: "Purchase not found" });

    res.json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching purchase" });
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const purchaseUpdated = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!purchaseUpdated) return res.status(404).json({ message: "Purchase not found" });

    res.json(purchaseUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating purchase" });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const purchaseDeleted = await Purchase.findByIdAndDelete(req.params.id);

    if (!purchaseDeleted) return res.status(404).json({ message: "Purchase not found" });

    res.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting purchase" });
  }
};
