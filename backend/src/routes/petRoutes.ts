import { Router } from 'express';
import {
	createPet,
	deletePet,
	getPets,
	getPetsByUser,
	updatePet,
} from '../controllers/petController';

const router = Router();
router.post('/pets', createPet);
router.get('/pets', getPets);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);
router.get('/users/:id/pets', getPetsByUser);

export default router;
