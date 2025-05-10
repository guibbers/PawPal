import { Router } from 'express';
import { createPet } from '../controllers/petController';

const router = Router();
router.post('/pets', createPet);

export default router;
