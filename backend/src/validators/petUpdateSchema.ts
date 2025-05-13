import { PetType, Sex } from '@prisma/client';
import { z } from 'zod';

export const petUpdateSchema = z.object({
	name: z.string().optional(),
	type: z.nativeEnum(PetType).optional(),
	profilePicture: z.string().url().optional(),
	breed: z.string().optional(),
	age: z.number().int().positive().optional(),
	sex: z.nativeEnum(Sex).optional(),
});
