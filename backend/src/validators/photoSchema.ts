import { z } from 'zod';

export const photoSchema = z.object({
	url: z.string().url({ message: 'URL inválida' }),
	petIds: z.array(z.string().uuid()).nonempty('Informe ao menos um pet'),
});
