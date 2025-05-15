import type { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardOverview = async (req: Request, res: Response) => {
	try {
		const [petsCount, usersCount, photosCount] = await Promise.all([
			prisma.pet.count(),
			prisma.user.count({ where: { role: 'TUTOR' } }),
			prisma.photo.count(),
		]);

		const dashboardData = { petsCount, usersCount, photosCount };

		return res.status(200).json(dashboardData);
	} catch (err: any) {
		console.log(err);
		return res.status(500).json({ error: 'Erro ao buscar dados.' });
	}
};
