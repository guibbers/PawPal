import type { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import prisma from './lib/prisma';
import { userSchema } from './validators/userSchema';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------------------------

app.get('/', (req, res) => {
	res.send('PawPal API funcionando 🐾');
});

app.post('/users', async (req: Request, res: Response) => {
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
});

app.get('/users', async (req: Request, res: Response) => {
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
				dogs: true,
			},
		});

		return res.status(200).json(users);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao buscar usuários' });
	}
});

app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
