import { Router } from 'express';
import recruitmentRoutes from './recruitmentRoutes.js';
import leadsRoutes from './leadsRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SkilloraPath Enterprise API',
    timestamp: new Date().toISOString()
  });
});

router.use('/recruitment', recruitmentRoutes);
router.use('/leads', leadsRoutes);

export default router;

