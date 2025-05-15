import { Router } from 'express';
import { getDashboardOverview } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.get(
	'/dashboard/overview',
	authenticate,
	authorize(['MANAGER', 'RECEPCIONIST']),
	getDashboardOverview,
);

export default router;
