const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Importar módulos de observabilidad
const { logger, logMiddleware } = require("./logger");
const metricsMiddleware = require("./middleware/metrics");
const metricsRoutes = require("./routes/metrics");

dotenv.config();
const app = express();

// ============================================
// CONEXIÓN A MONGODB
// ============================================
connectDB();

// ============================================
// MIDDLEWARE BÁSICO
// ============================================
app.use(cors());
app.use(express.json());

// ============================================
// MIDDLEWARE DE OBSERVABILIDAD (AÑADIDO)
// ============================================
app.use(metricsMiddleware);  // Métricas de peticiones
app.use(logMiddleware);       // Logs de peticiones

// ============================================
// ENDPOINTS DE MÉTRICAS Y SALUD (AÑADIDO)
// ============================================
app.use("/", metricsRoutes);  // /metrics y /health

// ============================================
// TUS RUTAS EXISTENTES (SE MANTIENEN IGUAL)
// ============================================
app.use("/api/services", require("./routes/services"));
app.use("/api/team", require("./routes/team"));
app.use("/api/citas", require("./routes/citas"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/autenticador", require("./routes/autenticador"));

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 Servidor corriendo en el puerto ${PORT}`);
    logger.info(`📊 Métricas disponibles en http://localhost:${PORT}/metrics`);
    logger.info(`❤️ Health check en http://localhost:${PORT}/health`);
});
