import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { loginSchema } from '../validators/userSchemas';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const login = async (req: Request, res: Response) => {
	try {
		const parsed = loginSchema.parse(req.body);
		const { email, password } = parsed;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: 'Credenciais inválidas.' });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ error: 'Credenciais inválidas.' });
		}

		const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: '7d',
		});

		const { password: _, ...userData } = user;

		return res.status(200).json({ user: userData, token });
	} catch (err: any) {
		if (err.name === 'ZodError') {
			return res.status(400).json({ error: err.errors });
		}

		console.error(err);
		return res.status(500).json({ error: 'Erro ao fazer login' });
	}
};
