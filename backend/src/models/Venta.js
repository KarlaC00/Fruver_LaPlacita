import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  id_venta: { type: Number, unique: true },
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  productos: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      nombre: String,
      cantidad: Number,
      precio_unitario: Number,
      subtotal: Number
    }
  ],
  fecha_venta: { type: Date, default: Date.now },
  total: { type: Number, required: true, min: 0 },
  metodo_pago: {
    type: String,
    required: true,
    trim: true,
    enum: ["Efectivo", "Tarjeta", "Transferencia", "Otro"]
  }
}, { timestamps: true });

ventaSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastVenta = await mongoose.model("Venta").findOne().sort({ id_venta: -1 });
    this.id_venta = lastVenta ? lastVenta.id_venta + 1 : 1;
  }
  next();
});

export default mongoose.model("Venta", ventaSchema);
