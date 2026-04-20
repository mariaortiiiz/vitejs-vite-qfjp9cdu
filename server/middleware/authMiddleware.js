const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    // formato: "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    //Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Guardar datos del usuario en req
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authMiddleware;