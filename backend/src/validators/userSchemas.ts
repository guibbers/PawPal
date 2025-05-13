import { Role } from '@prisma/client';
import { z } from 'zod';

export const userSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Nome precisa ter ao menos 3 caracteres.' }),
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z
		.string()
		.min(6, { message: 'senha precisa ter ao menos 6 caracteres' }),
	profilePicture: z.string().url().optional(),
	phone: z.string().min(11, { message: 'Número de telefone inválido' }),
	role: z.enum(['TUTOR', 'MONITOR', 'MANAGER', 'RECEPCIONIST']),
});

export const userSearchSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	normalizedName: z.string().optional(),
	role: z.enum(['TUTOR', 'MONITOR', 'MANAGER', 'RECEPCIONIST']).optional(),
});

export const userUpdateSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	profilePicture: z.string().url().optional(),
	password: z.string().min(6).optional(),
	phone: z.string().min(10).max(15).optional(),
	role: z.nativeEnum(Role).optional(),
});
