import type { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { userSchema } from '../validators/userSchema';
import { userSearchSchema } from '../validators/userSearchSchema';
import { userUpdateSchema } from '../validators/userUpdateSchema';

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

		const user = await prisma.user.create({
			data: {
				...validated,
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
		const { role } = req.query;

		const users = await prisma.user.findMany({
			where: role ? { role: role as Role } : {},
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
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao buscar usuários' });
	}
};

export const searchUsers = async (req: Request, res: Response) => {
	try {
		const parsed = userSearchSchema.safeParse(req.query);

		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.format() });
		}
		const { id, name, email, role } = parsed.data;

		if (!id && !email && !name && !role) {
			return res
				.status(400)
				.json({ error: 'Informe ao menos um critério de busca.' });
		}

		const filters: any = {};

		if (id) filters.id = id;
		if (email) filters.email = email;
		if (name) filters.name = { contains: name, mode: 'insensitive' };
		if (role) filters.role = role.toUpperCase();

		const users = await prisma.user.findMany({
			where: filters,
			include: {
				pets: true,
			},
		});

		return res.status(200).json(users);
	} catch (err) {
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
