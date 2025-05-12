import { z } from 'zod';

export const petSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	type: z.enum(['DOG', 'CAT', 'BIRD', 'FERRET', 'FISH', 'OTHER']),
	breed: z.string(),
	age: z.number().int().positive(),
	tutorId: z.string().uuid('ID do tutor inválido'),
	neutered: z.boolean(),
	sex: z.enum(['MALE', 'FEMALE']),
	notes: z.string().optional(),
});
