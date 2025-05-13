import { z } from 'zod';

export const photoSchema = z.object({
	url: z.string().url({ message: 'URL inválida' }),
	petIds: z.array(z.string().uuid()).nonempty('Informe ao menos um pet'),
});

export const photoUpdateSchema = z.object({
	url: z.string().url('URL inválida').optional(),
	petIds: z.array(z.string().uuid('ID de pet inválido')).optional(),
});
