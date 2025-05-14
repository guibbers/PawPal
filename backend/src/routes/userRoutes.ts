import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
} from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
router.post(
	'/users',
	authenticate,
	authorize(['MANAGER', 'RECEPCIONIST']),
	createUser,
);
router.get(
	'/users',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	getUsers,
);
router.put(
	'/users/:id',
	authenticate,
	authorize(['MANAGER', 'RECEPCIONIST']),
	updateUser,
);
router.delete('/users/:id', authenticate, authorize(['MANAGER']), deleteUser);

export default router;
