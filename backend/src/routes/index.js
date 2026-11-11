import { Router } from 'express';
import recruitmentRoutes from './recruitmentRoutes.js';
import leadsRoutes from './leadsRoutes.js';
import { renderStatusDashboard } from '../views/statusDashboard.js';

const router = Router();

router.get('/health', (req, res) => {
  const data = {
    status: 'online',
    service: 'SkilloraPath Enterprise API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

  if (req.headers.accept && req.headers.accept.includes('text/html') && req.query.format !== 'json') {
    return res.setHeader('Content-Type', 'text/html; charset=utf-8').send(renderStatusDashboard(data));
  }

  res.json(data);
});

router.use('/recruitment', recruitmentRoutes);
router.use('/leads', leadsRoutes);

export default router;
