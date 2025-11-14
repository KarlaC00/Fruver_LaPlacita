import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productcontroller.js";
import { upload } from "../middlewares/upload.js";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware.js";

const router = Router();


// 👇 agrega el middleware upload.single("image")
router.get("/", getProducts);
router.get("/:id", getProduct);

// Rutas protegidas
router.post("/", verificarToken, soloAdmin, upload.single("image"), createProduct);
router.put("/:id", verificarToken, soloAdmin, upload.single("image"), updateProduct);
router.delete("/:id", verificarToken, soloAdmin, deleteProduct);

export default router;
