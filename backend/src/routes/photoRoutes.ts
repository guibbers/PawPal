import { Router } from 'express';
import {
	createPhoto,
	deletePhoto,
	getPhotos,
	getPhotosByPetId,
	updatePhoto,
} from '../controllers/photoController';

const router = Router();
router.post('/photos', createPhoto);
router.get('/photos', getPhotos);
router.get('/pets/:id/photos', getPhotosByPetId);
router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', deletePhoto);

export default router;
