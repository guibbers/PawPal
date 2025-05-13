import { Router } from 'express';
import {
	createPhoto,
	deletePhoto,
	getPhotos,
	updatePhoto,
} from '../controllers/photoController';

const router = Router();
router.post('/photos', createPhoto);
router.get('/photos', getPhotos);
router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', deletePhoto);

export default router;
