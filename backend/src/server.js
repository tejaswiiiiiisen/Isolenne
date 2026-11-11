import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

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
  res.status(200).json({
    success: true,
    message: 'SkilloraPath Enterprise API is live and running successfully!',
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
  });
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
