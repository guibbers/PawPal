import { Router } from 'express';
import {
	createPet,
	deletePet,
	getPets,
	getPetsByUser,
	updatePet,
} from '../controllers/petController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
router.post(
	'/pets',
	authenticate,
	authorize(['MANAGER', 'RECEPCIONIST']),
	createPet,
);
router.get(
	'/pets',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	getPets,
);
router.put(
	'/pets/:id',
	authenticate,
	authorize(['MANAGER', 'RECEPCIONIST']),
	updatePet,
);
router.delete('/pets/:id', authenticate, authorize(['MANAGER']), deletePet);
router.get('/users/:id/pets', getPetsByUser);

export default router;
