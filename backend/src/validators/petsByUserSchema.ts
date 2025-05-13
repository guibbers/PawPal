import { z } from 'zod';

export const getPetsByUserSchema = z.object({
	id: z.string().uuid(),
});
