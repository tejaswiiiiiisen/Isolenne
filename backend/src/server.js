import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { renderStatusDashboard } from './views/statusDashboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome & status endpoint
app.get('/', (req, res) => {
  const data = {
    status: 'online',
    success: true,
    message: 'SkilloraPath Enterprise API is live and operational!',
    service: 'SkilloraPath Backend',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      jobs: '/api/recruitment/jobs',
      apply: '/api/recruitment/apply',
      applications: '/api/recruitment/applications',
      leads: '/api/leads',
      contact: '/api/submit-contact'
    },
    timestamp: new Date().toISOString()
  };

  // If request comes from a browser, show the gorgeous dashboard!
  if (req.headers.accept && req.headers.accept.includes('text/html') && req.query.format !== 'json') {
    return res.setHeader('Content-Type', 'text/html; charset=utf-8').send(renderStatusDashboard(data));
  }

  res.status(200).json(data);
});

// Contact endpoint fallback
app.post('/api/submit-contact', (req, res) => {
  console.log('Received contact submission:', req.body);
  res.json({ success: true, message: 'Contact inquiry received successfully.' });
});

// Mount modular API routes
app.use('/api', routes);

// 404 handler for undefined routes
app.use((req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.status(404).send(`
      <div style="font-family:sans-serif;text-align:center;padding:50px;background:#090d16;color:#fff;min-height:100vh;">
        <h1 style="color:#ef4444;font-size:40px;">404 Not Found</h1>
        <p style="color:#94a3b8;">The requested endpoint <code>${req.originalUrl}</code> does not exist.</p>
        <a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#0284c7;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">&larr; Back to API Dashboard</a>
      </div>
    `);
  }
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handling middleware
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`  SkilloraPath Backend API running on port ${PORT}`);
  console.log(`  Root Endpoint: http://localhost:${PORT}/`);
  console.log(`  Health Check:  http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

export default app;
