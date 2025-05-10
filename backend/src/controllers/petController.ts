import type { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createPetSchema } from '../validators/createPetSchema';

export const createPet = async (req: Request, res: Response) => {
	try {
		const validated = createPetSchema.parse(req.body);

		const pet = await prisma.pet.create({
			data: {
				...validated,
			},
		});

		return res.status(201).json(pet);
	} catch (err: any) {
		if (err.name === 'ZodError') {
			return res.status(400).json({ error: err.errors });
		}
		console.error(err);
		return res
			.status(500)
			.json({ error: 'Erro intero ao criar pet. Tente novamente' });
	}
};
