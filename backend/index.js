import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";
import { connectDB } from "./src/db.js";
import Empleado from "./src/models/Empleado.js";
import bcrypt from "bcryptjs";

// Importar rutas
import productRoutes from "./src/routes/productroutes.js";
import purchaseRoutes from "./src/routes/purchaseRoutes.js";
import ventasRoutes from "./src/routes/ventas.routes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Configurar uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use("/uploads", express.static(uploadsPath));

// Conectar a la base de datos
connectDB();



// Usar rutas
app.use("/api/auth", authRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/ventas", ventasRoutes);

// Rutas de prueba
app.get("/test-image", (req, res) => {
  res.send(`
    <h1>Prueba de imagen</h1>
    <img src="http://localhost:4500/uploads/1761427531635-pera-nacional.jpg" alt="Test">
    <p>Si no ves la imagen, no está funcionando</p>
  `);
});

app.get("/check-uploads", (req, res) => {
  try {
    const files = fs.readdirSync(uploadsPath);
    res.json({
      message: "Archivos en uploads:",
      path: uploadsPath,
      files: files,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(4500, () => {
  console.log("🚀 Servidor en http://localhost:4500");
  console.log("📸 Imágenes en: http://localhost:4500/uploads/");
});
