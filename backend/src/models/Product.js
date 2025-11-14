import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ["Frutas", "Verduras"], 
    required: true
  },
  activo: {
    type: Boolean,
    default: true 
  }
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);
