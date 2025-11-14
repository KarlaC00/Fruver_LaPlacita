import Usuario from "../models/Usuario.js";
import Cliente from "../models/Cliente.js";
import Empleado from "../models/Empleado.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "claveSuperSecreta";

/* ===========================
   Registro Cliente (auto)
=========================== */
export const registerCliente = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, direccion } = req.body;

    const exists = await Usuario.findOne({ email });
    if (exists) return res.status(400).json({ message: "Correo ya registrado" });

    const cliente = await Cliente.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "Cliente",
      direccion
    });

    res.status(201).json({ message: "Cliente registrado correctamente", usuario: cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar cliente", error });
  }
};

/* ===========================
   Crear Empleado (solo admin)
=========================== */
export const crearEmpleado = async (req, res) => {
  try {
    const { firstName, lastName, role, phone, email, hiredate } = req.body;

    // Verificar rol admin
    if (req.user.role !== "Administrador")
      return res.status(403).json({ message: "Acceso denegado" });

    const exists = await Usuario.findOne({ email });
    if (exists) return res.status(400).json({ message: "Correo ya registrado" });

    const empleado = await Empleado.create({
      firstName,
      lastName,
      role, // "Administrador" o "Vendedor"
      phone,
      email,
      password: "default123", // se puede cambiar después
      hiredate
    });

    res.status(201).json({ message: "Empleado creado correctamente", usuario: empleado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear empleado", error });
  }
};

/* ===========================
           Login
=========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await usuario.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role, tipo: usuario.tipo },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, rol: usuario.role, nombre: usuario.firstName, tipo: usuario.tipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

/* ===========================
    Listar usuarios
=========================== */
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // trae todos los tipos
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

/* ===========================
    Obtener usuario por ID
=========================== */
export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

/* ===========================
   Actualizar usuario
=========================== */
export const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

/* ===========================
   Inactivar / Reactivar usuario
=========================== */
export const toggleUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    usuario.estado = usuario.estado === "activo" ? "inactivo" : "activo";
    await usuario.save();

    res.json({
      message: `Usuario ${usuario.estado === "activo" ? "reactivado" : "inactivado"} correctamente`,
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar estado del usuario", error });
  }
};
