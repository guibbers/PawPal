import { PetType } from '@prisma/client';
import { z } from 'zod';

export const petUpdateSchema = z.object({
	name: z.string().optional(),
	type: z.nativeEnum(PetType).optional(),
	breed: z.string().optional(),
	age: z.number().int().positive().optional(),
	sex: z.string().optional(),
});
