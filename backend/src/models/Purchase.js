import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  purchase_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

purchaseSchema.pre("save", function (next) {
  this.subtotal = this.quantity * this.unit_price;
  next();
});

export default mongoose.model("Purchase", purchaseSchema);
