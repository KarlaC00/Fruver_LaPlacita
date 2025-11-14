import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const empleadoSchema = new mongoose.Schema({
  hiredate: {
    type: Date,
    required: true
  },
  fecha_despido: {
    type: Date,
    default: null
  }
});

export default Usuario.discriminator("Empleado", empleadoSchema);
