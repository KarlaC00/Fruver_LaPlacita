import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const clienteSchema = new mongoose.Schema({
  direccion: {
    type: String,
    required: true,
    trim: true
  },
});

export default Usuario.discriminator("Cliente", clienteSchema);
