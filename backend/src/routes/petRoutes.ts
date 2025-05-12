import { Router } from 'express';
import {
	createPet,
	deletePet,
	getPets,
	searchPets,
	updatePet,
} from '../controllers/petController';

const router = Router();
router.post('/pets', createPet);
router.get('/pets', getPets);
router.get('/pets/search', searchPets);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);

export default router;
