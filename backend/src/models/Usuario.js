import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true, 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["Administrador", "Vendedor", "Cliente"] 
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9+\-\s()]{7,20}$/
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo"],
    default: "activo"
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  discriminatorKey: 'tipo' // campo que distingue el tipo de usuario
});

// Hashear contraseña
usuarioSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Usuario", usuarioSchema);
