import { Router } from 'express';
import { MechanicsController } from '../controllers/mechanicsController.js';

const router = Router();

router.get('/mechanics', MechanicsController.getAllMechanics);
export default router;
