import { z } from 'zod';

export const photoUpdateSchema = z.object({
	url: z.string().url('URL inválida').optional(),
	petIds: z.array(z.string().uuid('ID de pet inválido')).optional(),
});
