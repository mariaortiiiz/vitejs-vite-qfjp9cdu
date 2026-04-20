const winston = require('winston');
const path = require('path');

// Directorio donde se guardarán los logs dentro del contenedor
const logDir = '/var/log/backend';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Logs a consola (se ven con docker logs)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Logs a archivo (los recogerá Filebeat/Logstash)
    new winston.transports.File({ 
      filename: path.join(logDir, 'app.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 5
    })
  ]
});

// Middleware para logs de peticiones HTTP
const logMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration_ms: duration,
      user_agent: req.get('user-agent') || 'unknown',
      ip: req.ip || req.connection.remoteAddress
    });
  });
  
  next();
};

module.exports = { logger, logMiddleware };
