const express = require('express');
const metrics = require('../metrics');
const router = express.Router();

// Endpoint para Prometheus - expone todas las métricas
router.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', metrics.register.contentType);
    res.end(await metrics.register.metrics());
  } catch (error) {
    res.status(500).end(error.message);
  }
});

// Endpoint simple para health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

module.exports = router;