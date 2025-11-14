import { Router } from "express";
import express from "express"; 
import {
  registerCliente,
  crearEmpleado,
  login,
  getUsuarios,
  getUsuario,
  updateUsuario,
  toggleUsuario
} from "../controllers/authController.js";


import {
  verificarToken,
  soloAdmin,
  authorizeRoles
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ===========================
      Registro y Login
=========================== */
// Clientes pueden registrarse solos
router.post("/register", registerCliente);

// Login unificado
router.post("/login", login);

/* ===========================
      Gestión de Usuarios
=========================== */
// Solo admin puede crear empleados
router.post("/empleado/create", verificarToken, soloAdmin, crearEmpleado);

// Listar todos los usuarios (solo admin)
router.get("/", verificarToken, soloAdmin, getUsuarios);

// Obtener usuario por ID (admin o usuario mismo)
router.get("/:id", verificarToken, (req, res, next) => {
  if (req.user.id === req.params.id || req.user.rol === "admin") return next();
  return res.status(403).json({ message: "Acceso denegado" });
}, getUsuario);

// Actualizar usuario (solo admin)
router.put("/:id", verificarToken, soloAdmin, updateUsuario);

// Inactivar / Reactivar usuario (solo admin)
router.patch("/toggle/:id", verificarToken, soloAdmin, toggleUsuario);

export default router;

