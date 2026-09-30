import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server and hosted previews
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-demo-user']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    app: 'EcoPulse AI Backend API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: [
      'POST /api/onboarding',
      'POST /api/telemetry/batch',
      'GET /api/telemetry',
      'POST /api/assessment/generate',
      'GET /api/assessment/latest',
      'PATCH /api/action-items/:id/status',
      'GET /api/reports/sustainability'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`🌿 EcoPulse AI Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.log(`Port ${PORT} in use, trying fallback port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`🌿 EcoPulse AI Server running on port ${fallbackPort}`);
      console.log(`📡 Health Check: http://localhost:${fallbackPort}/api/health`);
    });
  } else {
    console.error('Server listen error:', err);
  }
});
