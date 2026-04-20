const client = require('prom-client');

// Colectar métricas por defecto de Node.js (memoria, CPU, event loop)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// ============================================
// MÉTRICAS PERSONALIZADAS
// ============================================

// Contador de peticiones HTTP totales
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP recibidas',
  labelNames: ['method', 'route', 'status']
});

// Histograma de duración de peticiones HTTP
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las peticiones HTTP en segundos',
  labelNames: ['method', 'route'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
});

// Gauge de conexiones activas
const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Número de conexiones activas actualmente'
});

// Histograma de duración de consultas a BD (para cuando implementes)
const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duración de consultas a la base de datos',
  labelNames: ['operation'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

// Contador de errores
const errorTotal = new client.Counter({
  name: 'error_total',
  help: 'Total de errores ocurridos',
  labelNames: ['type', 'route']
});

module.exports = {
  httpRequestsTotal,
  httpRequestDuration,
  activeConnections,
  dbQueryDuration,
  errorTotal,
  register: client.register
};