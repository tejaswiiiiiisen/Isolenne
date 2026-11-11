import { Router } from 'express';
import { getJobs, applyJob, getApplications } from '../controllers/recruitmentController.js';

const router = Router();

router.get('/jobs', getJobs);
router.post('/apply', applyJob);
router.get('/applications', getApplications);

export default router;

