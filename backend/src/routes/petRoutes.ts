import { Router } from 'express';
import { createPet, getPets, searchPets } from '../controllers/petController';

const router = Router();
router.post('/pets', createPet);
router.get('/pets', getPets);
router.get('/pets/search', searchPets);

export default router;
