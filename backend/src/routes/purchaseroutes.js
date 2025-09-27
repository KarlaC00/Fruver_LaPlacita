import { Router } from "express";
import {
  createPurchase,
  getPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchasecontroller.js";

const router = Router();

router.post("/purchases", createPurchase);
router.get("/purchases", getPurchases);
router.get("/purchases/:id", getPurchase);
router.put("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;
