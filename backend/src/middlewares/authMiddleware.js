import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "claveSuperSecreta";

// 🔒 Verifica si hay token
export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado, token faltante" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const rol = decoded.rol || decoded.role;
    req.user = { ...decoded, rol };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// 👑 Solo administradores
export const soloAdmin = (req, res, next) => {
  if (req.user?.rol !== "Administrador") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }
  next();
};

// 👷 Solo empleados
export const soloEmpleado = (req, res, next) => {
  if (req.user?.rol !== "Vendedor") {
    return res.status(403).json({ message: "Acceso denegado: solo empleados" });
  }
  next();
};

// 🔐 Middleware general por rol
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.rol)) {
      return res.status(403).json({ message: "Acceso denegado: rol insuficiente" });
    }
    next();
  };
};
