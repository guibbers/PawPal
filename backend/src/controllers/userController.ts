import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { latinize } from 'modern-diacritics';
import prisma from '../lib/prisma';
import { normalize } from '../utils/normalize';
import {
	userSchema,
	userSearchSchema,
	userUpdateSchema,
} from '../validators/userSchemas';

export const createUser = async (req: Request, res: Response) => {
	try {
		const validated = userSchema.parse(req.body);
		const emailExists = await prisma.user.findUnique({
			where: { email: validated.email },
		});

		if (emailExists) {
			return res
				.status(400)
				.json({ error: 'Não foi possível criar o usuário' });
		}
		const hashedPassword = await bcrypt.hash(validated.password, 10);
		const normalizedName = latinize(validated.name, { lowerCase: true });

		const user = await prisma.user.create({
			data: {
				...validated,
				normalizedName,
				password: hashedPassword,
			},
		});

		const { password, ...userWithoutPassword } = user;

		return res.status(201).json(userWithoutPassword);
	} catch (err: any) {
		if (err.name === 'ZodError') {
			return res.status(400).json({ error: err.errors });
		}

		console.error(err);
		return res
			.status(500)
			.json({ error: 'Erro interno ao criar usuário. Tente novamente.' });
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const parsed = userSearchSchema.safeParse(req.query);

		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.format() });
		}

		const { id, name, email, role } = parsed.data;

		const filters: any = {};

		if (id) filters.id = id;
		if (email) filters.email = email;
		if (name) {
			filters.normalizedName = {
				contains: normalize(name),
				mode: 'insensitive',
			};
		}
		if (role) filters.role = role;

		const users = await prisma.user.findMany({
			where: filters,
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				pets: true,
			},
		});

		return res.status(200).json(users);
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao buscar usuários' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const parsed = userUpdateSchema.parse(req.body);

		const dataToUpdate = { ...parsed };

		if (parsed.password) {
			dataToUpdate.password = await bcrypt.hash(parsed.password, 10);
		}

		const updatedUser = await prisma.user.update({
			where: { id },
			data: dataToUpdate,
		});

		const { password, ...userWithoutPassword } = updatedUser;

		return res.status(200).json(userWithoutPassword);
	} catch (err: any) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Usuário não encontrado' });
		}

		if (err.name === 'ZodError') {
			return res.status(400).json({ error: err.errors });
		}

		console.error(err);
		return res.status(500).json({ error: 'Erro ao atualizar usuário' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.user.delete({
			where: { id },
		});

		return res.status(200).json({ message: 'Usuário deletado com sucesso' });
	} catch (err: any) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Usuário não encontrado' });
		}

		console.error(err);
		return res.status(500).json({ error: 'Erro ao deletar usuário' });
	}
};
