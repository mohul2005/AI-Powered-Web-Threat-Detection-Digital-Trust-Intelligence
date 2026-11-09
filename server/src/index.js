import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import scanRouter from './routes/scan.js';
import intelRouter from './routes/intel.js';
import extensionsRouter from './routes/extensions.js';
import guideRouter from './routes/guide.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = fs.existsSync(path.resolve(__dirname, '../../client/dist'))
  ? path.resolve(__dirname, '../../client/dist')
  : path.resolve(__dirname, '../../dist');

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
const sendHealth = (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'TrustMatrix Intelligence API',
    version: '2.0.1-PROD',
    engines: {
      phishingAI: 'READY',
      certTrustPKI: 'READY',
      webSecAuditor: 'READY',
      collaborativeIntel: 'READY',
      advancedExtensions: 'READY'
    },
    timestamp: new Date().toISOString()
  });
};

app.get('/api/health', sendHealth);
app.get('/health', sendHealth);
app.get('/api', sendHealth);

// Mount Routes with /api prefix
app.use('/api', scanRouter);
app.use('/api/intel', intelRouter);
app.use('/api/extensions', extensionsRouter);
app.use('/api/guide', guideRouter);

// Also mount without /api prefix for resilient serverless dispatch
app.use('/', scanRouter);
app.use('/intel', intelRouter);
app.use('/extensions', extensionsRouter);
app.use('/guide', guideRouter);

// Only listen on port if executed directly as main script (Docker container, standalone node, Cloud Run)
const isDirectRun = Boolean(
  process.argv[1] && (
    process.argv[1].includes('server') && process.argv[1].includes('index.js')
  )
);

// Serve Static Frontend Assets if built
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (
      req.url.startsWith('/api') ||
      req.url.startsWith('/intel') ||
      req.url.startsWith('/extensions') ||
      req.url.startsWith('/guide')
    ) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 Handler for API endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.url}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error: ' + (err.message || 'Unknown error')
  });
});

if (isDirectRun) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🛡️  TrustMatrix AI Security Engine running on http://0.0.0.0:${PORT}`);
    console.log(`⚡  Real-time TLS & Threat Intelligence endpoints active`);
    console.log(`=======================================================`);
  });
}

export default app;
