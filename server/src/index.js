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
const clientDistPath = path.resolve(__dirname, '../../client/dist');

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

// Serve Static Frontend Assets if built
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error: ' + (err.message || 'Unknown error')
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🛡️  TrustMatrix AI Security Engine running on http://localhost:${PORT}`);
    console.log(`⚡  Real-time TLS & Threat Intelligence endpoints active`);
    console.log(`=======================================================`);
  });
}

export default app;
