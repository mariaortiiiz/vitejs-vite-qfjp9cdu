const metrics = require('../metrics');

const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  metrics.activeConnections.inc();
  
  const route = req.route ? req.route.path : req.path;
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    metrics.httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status: res.statusCode
    });
    
    metrics.httpRequestDuration.observe(
      { method: req.method, route: route },
      duration
    );
    
    metrics.activeConnections.dec();
  });
  
  next();
};

module.exports = metricsMiddleware;
