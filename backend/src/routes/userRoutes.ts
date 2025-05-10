import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getUsers,
	searchUsers,
	updateUser,
} from '../controllers/userController';

const router = Router();
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/search', searchUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
