import { z } from 'zod';

export const petSearchSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().optional(),
	type: z.enum(['DOG', 'CAT', 'FERRET', 'FISH', 'OTHER']).optional(),
	breed: z.string().optional(),
	age: z.coerce.number().int().optional(),
});
