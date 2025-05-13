import type { Request, Response } from 'express';
import { latinize } from 'modern-diacritics';
import prisma from '../lib/prisma';
import { normalize } from '../utils/normalize';
import {
	getPetsByUserSchema,
	petSchema,
	petSearchSchema,
	petUpdateSchema,
} from '../validators/petSchemas';

export const createPet = async (req: Request, res: Response) => {
	try {
		const validated = petSchema.parse(req.body);

		const normalized = {
			...validated,
			breed: validated.breed || null,
			notes: validated.notes || null,
			age: validated.age ?? null,
		};

		const tutorExists = await prisma.user.findUnique({
			where: {
				id: validated.tutorId,
			},
		});

		if (!tutorExists) {
			return res.status(404).json({ error: 'Tutor não encontrado. ' });
		}

		const normalizedName = latinize(validated.name, { lowerCase: true });

		const pet = await prisma.pet.create({
			data: {
				...normalized,
				normalizedName,
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
			.json({ error: 'Erro interno ao criar pet. Tente novamente' });
	}
};

export const updatePet = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const parsed = petUpdateSchema.parse(req.body);
		const dataToUpdate = { ...parsed };

		const updatedPet = await prisma.pet.update({
			where: { id },
			data: dataToUpdate,
		});

		return res.status(200).json(updatedPet);
	} catch (err: any) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Pet não encontrado' });
		}

		if (err.name === 'ZodError') {
			return res.status(400).json({ error: err.errors });
		}

		console.error(err);
		return res.status(500).json({ error: 'Erro ao atualizar pet' });
	}
};

export const deletePet = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.pet.delete({
			where: {
				id,
			},
		});

		return res.status(200).json({ message: 'Pet deletado com sucesso' });
	} catch (err: any) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Pet não encontrado' });
		}

		console.error(err);
		return res.status(500).json({ error: 'Erro ao deletar pet' });
	}
};

export const getPetsByUser = async (req: Request, res: Response) => {
	try {
		const { id } = getPetsByUserSchema.parse(req.params);

		const userExists = await prisma.user.findUnique({
			where: { id },
		});

		if (!userExists) {
			return res.status(404).json({ error: 'Usuário não encontrado.' });
		}

		const pets = await prisma.pet.findMany({
			where: { tutorId: id },
		});

		return res.status(200).json(pets);
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao buscar pets do usuário.' });
	}
};

export const getPets = async (req: Request, res: Response) => {
	try {
		const parsed = petSearchSchema.safeParse(req.query);

		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.format() });
		}

		const { id, name, breed, type, age, neutered, sex, tutorId } = parsed.data;

		const filters: any = {};

		if (id) filters.id = id;
		if (name)
			filters.normalizedName = {
				contains: normalize(name),
				mode: 'insensitive',
			};
		if (breed) filters.breed = breed;
		if (type) filters.type = type;
		if (age) filters.age = age;
		if (neutered !== undefined) filters.neutered = neutered;
		if (sex) filters.sex = sex;
		if (tutorId) filters.tutorId = tutorId;

		const pets = await prisma.pet.findMany({
			where: filters,
			include: {
				tutor: {
					select: { name: true },
				},
			},
		});

		return res.status(200).json(pets);
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao buscar pets.' });
	}
};
