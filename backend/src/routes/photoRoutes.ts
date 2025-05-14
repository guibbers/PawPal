import { Router } from 'express';
import {
	createPhoto,
	deletePhoto,
	getMyPetsPhotos,
	getPhotos,
	getPhotosByPetId,
	updatePhoto,
} from '../controllers/photoController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
router.post(
	'/photos',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	createPhoto,
);
router.get(
	'/photos',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	getPhotos,
);
router.get(
	'/pets/:id/photos',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	getPhotosByPetId,
);
router.put(
	'/photos/:id',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	updatePhoto,
);
router.delete(
	'/photos/:id',
	authenticate,
	authorize(['MANAGER', 'MONITOR', 'RECEPCIONIST']),
	deletePhoto,
);

router.get(
	'/photos/my-pets',
	authenticate,
	authorize(['MONITOR', 'MANAGER', 'RECEPCIONIST', 'TUTOR']),
	getMyPetsPhotos,
);

export default router;
