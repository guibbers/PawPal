import { z } from 'zod';

export const userSearchSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	normalizedName: z.string().optional(),
	role: z.enum(['TUTOR', 'MONITOR', 'MANAGER', 'RECEPCIONIST']).optional(),
});
