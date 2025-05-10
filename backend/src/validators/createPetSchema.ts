import { z } from 'zod';

export const createPetSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	type: z.enum(['DOG', 'CAT']),
	breed: z.string().optional(),
	age: z.number().int().positive().optional(),
	tutorId: z.string().uuid('ID do tutor inválido'),
	neutered: z.boolean(),
	gender: z.enum(['MALE', 'FEMALE']),
	notes: z.string().optional(),
});
