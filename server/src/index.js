import express from 'express';
import cors from 'cors';
import scanRouter from './routes/scan.js';
import intelRouter from './routes/intel.js';
import extensionsRouter from './routes/extensions.js';
import guideRouter from './routes/guide.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'TrustMatrix Intelligence API',
    version: '2.0.0-PROD',
    engines: {
      phishingAI: 'READY',
      certTrustPKI: 'READY',
      webSecAuditor: 'READY',
      collaborativeIntel: 'READY',
      advancedExtensions: 'READY'
    },
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api', scanRouter);
app.use('/api/intel', intelRouter);
app.use('/api/extensions', extensionsRouter);
app.use('/api/guide', guideRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error: ' + (err.message || 'Unknown error')
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🛡️  TrustMatrix AI Security Engine running on http://localhost:${PORT}`);
  console.log(`⚡  Real-time TLS & Threat Intelligence endpoints active`);
  console.log(`=======================================================`);
});
