import { Router } from 'express';
import {
	createPhoto,
	deletePhoto,
	getPhotos,
	searchPhotos,
	updatePhoto,
} from '../controllers/photoController';

const router = Router();
router.post('/photos', createPhoto);
router.get('/photos', getPhotos);
// router.get('/photos/search', searchPhotos);
// router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', deletePhoto);

export default router;
