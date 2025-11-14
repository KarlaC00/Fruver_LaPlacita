import express from "express";
import {
  createVenta,
  getVentas,
  getVenta,
  updateVenta,
  deleteVenta,
} from "../controllers/ventaController.js";
import { verificarToken, soloAdmin, soloEmpleado } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 👷 Solo los empleados pueden crear y actualizar ventas
router.post("/", verificarToken, soloEmpleado, createVenta);
router.put("/:id", verificarToken, soloEmpleado, updateVenta);

// 👑 Solo los administradores pueden listar o eliminar ventas
router.get("/", verificarToken, soloAdmin, getVentas);
router.delete("/:id", verificarToken, soloAdmin, deleteVenta);

// 📦 Cualquier usuario autenticado puede ver una venta específica
router.get("/:id", verificarToken, getVenta);

export default router;


