import { Router } from 'express';
import { submitLead, getLeads } from '../controllers/leadsController.js';

const router = Router();

router.post('/', submitLead);
router.get('/', getLeads);

export default router;

