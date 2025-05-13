import { PetType, Sex } from '@prisma/client';
import { z } from 'zod';

export const petSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	profilePicture: z.string().url().optional(),
	type: z.enum(['DOG', 'CAT', 'BIRD', 'FERRET', 'FISH', 'OTHER']),
	breed: z.string(),
	age: z.number().int().positive(),
	tutorId: z.string().uuid('ID do tutor inválido'),
	neutered: z.boolean(),
	sex: z.enum(['MALE', 'FEMALE']),
	notes: z.string().optional(),
});

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

export const petUpdateSchema = z.object({
	name: z.string().optional(),
	normalizedName: z.string().optional(),
	type: z.nativeEnum(PetType).optional(),
	profilePicture: z.string().url().optional(),
	breed: z.string().optional(),
	age: z.number().int().positive().optional(),
	sex: z.nativeEnum(Sex).optional(),
});

export const getPetsByUserSchema = z.object({
	id: z.string().uuid(),
});
