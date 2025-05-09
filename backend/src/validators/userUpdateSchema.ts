import { Role } from '@prisma/client';
import { z } from 'zod';

export const userUpdateSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().min(6).optional(),
	phone: z.string().min(10).max(15).optional(),
	role: z.nativeEnum(Role).optional(),
});
