import { z } from 'zod';

export const petSchema = z.object({
	name: z.string().min(2, 'O nome do animal é obrigatório'),
	type: z.enum(['DOG', 'CAT', 'FERRET', 'FISH', 'BIRD', 'OTHER']),
	breed: z.string().optional(),
	age: z.number().int().positive().optional(),
	tutorId: z.string().uuid('ID do tutor inválido'),
	neutered: z.boolean(),
	sex: z.enum(['MALE', 'FEMALE']),
	notes: z.string().optional(),
});
