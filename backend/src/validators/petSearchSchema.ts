import { PetType, Sex } from '@prisma/client';
import { z } from 'zod';

export const petSearchSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().optional(),
	type: z.nativeEnum(PetType).optional(),
	breed: z.string().optional(),
	age: z.coerce.number().int().optional(),
	neutered: z.boolean().optional(),
	sex: z.nativeEnum(Sex).optional(),
	tutorId: z.string().uuid().optional(),
});
