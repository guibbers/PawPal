import type { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { photoSchema, photoUpdateSchema } from '../validators/photoSchemas';

export const createPhoto = async (req: Request, res: Response) => {
	try {
		const parsed = photoSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.format() });
		}

		const { url, petIds } = parsed.data;
		const photo = await prisma.photo.create({
			data: {
				url,
				pets: {
					create: petIds.map((petId) => ({
						pet: { connect: { id: petId } },
					})),
				},
			},
			include: {
				pets: {
					include: {
						pet: true,
					},
				},
			},
		});

		return res.status(200).json(photo);
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao cadastrar foto' });
	}
};

export const getPhotos = async (req: Request, res: Response) => {
	try {
		const photos = await prisma.photo.findMany({
			include: {
				pets: {
					include: {
						pet: {
							select: {
								id: true,
								name: true,
								normalizedName: true,
							},
						},
					},
				},
			},
		});

		return res.status(200).json(photos);
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao listar fotos' });
	}
};

export const getPhotosByPetId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const pet = await prisma.pet.findUnique({
			where: { id },
		});

		if (!pet) {
			return res.status(404).json({ error: 'Pet não encontrado.' });
		}

		const photos = await prisma.photo.findMany({
			where: {
				pets: {
					some: {
						petId: id,
					},
				},
			},
			include: {
				pets: {
					include: {
						pet: {
							select: {
								id: true,
								name: true,
								normalizedName: true,
							},
						},
					},
				},
			},
		});

		return res.status(200).json(photos);
	} catch (err: any) {
		console.error(err);

		return res.status(500).json({ error: 'Erro ao buscar fotos do pet.' });
	}
};

export const updatePhoto = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const parsed = photoUpdateSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.format() });
		}

		const { url, petIds } = parsed.data;

		const existingPhoto = await prisma.photo.findUnique({
			where: { id },
			include: { pets: true },
		});

		if (!existingPhoto) {
			return res.status(404).json({ error: 'Foto não encontrada.' });
		}

		const updatedPhoto = await prisma.photo.update({
			where: { id },
			data: {
				url: url ?? existingPhoto.url,
				pets: petIds
					? {
							deleteMany: {},
							create: petIds.map((petId) => ({
								pet: { connect: { id: petId } },
							})),
						}
					: undefined,
			},
			include: {
				pets: {
					include: { pet: true },
				},
			},
		});

		return res.status(200).json(updatedPhoto);
	} catch (err: any) {
		console.log(err);
		return res.status(500).json({ error: 'Erro ao atualizar foto.' });
	}
};

export const deletePhoto = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const photo = await prisma.photo.findUnique({
			where: { id },
		});

		if (!photo) {
			return res.status(400).json({ error: 'Foto não encontrada.' });
		}

		await prisma.petPhoto.deleteMany({
			where: { photoId: id },
		});

		await prisma.photo.delete({
			where: { id },
		});

		return res.status(200).json({ message: 'Foto excluída com sucesso.' });
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({ error: 'Erro ao excluir foto.' });
	}
};
