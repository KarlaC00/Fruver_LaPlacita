import { Router } from "express";
import {
  createPurchase,
  getPurchases,
  getPurchase,
} from "../controllers/purchaseController.js";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// 👑 Solo los administradores pueden crear y ver compras
router.post("/purchases", verificarToken, soloAdmin, createPurchase);
router.get("/purchases", verificarToken, soloAdmin, getPurchases);

// 📦 Un administrador puede ver una compra específica
router.get("/purchases/:id", verificarToken, soloAdmin, getPurchase);

export default router;
