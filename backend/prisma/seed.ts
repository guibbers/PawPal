import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user1 = await prisma.user.create({
		data: {
			name: 'Juli Dominguez',
			normalizedName: 'juli dominguez',
			email: 'juli@pawpal.com',
			password: 'senha123',
			phone: '11999999999',
			role: 'TUTOR',
			profilePicture:
				'https://pbs.twimg.com/profile_images/1922088145249538048/mvUMUF_l_400x400.jpg',
		},
	});

	const user2 = await prisma.user.create({
		data: {
			name: 'Laura Aguiar',
			normalizedName: 'laura aguiar',
			email: 'laura@pawpal.com',
			password: 'senha123',
			phone: '11988888888',
			role: 'TUTOR',
			profilePicture:
				'https://pbs.twimg.com/profile_images/1885384480975695872/ymcsggkr_400x400.jpg',
		},
	});

	const user3 = await prisma.user.create({
		data: {
			name: 'Guilherme Torres',
			normalizedName: 'guilherme torres',
			email: 'guilherme@pawpal.com',
			password: 'senha123',
			phone: '11988888888',
			role: 'MANAGER',
			profilePicture:
				'https://pbs.twimg.com/profile_images/1767705764011937793/u0U0xog4_400x400.jpg',
		},
	});

	const user4 = await prisma.user.create({
		data: {
			name: 'Teresa Maria',
			normalizedName: 'teresa maria',
			email: 'teresa@pawpal.com',
			password: 'senha123',
			phone: '11988888888',
			role: 'RECEPCIONIST',
			profilePicture: 'https://example.com/perfil-maria.jpg',
		},
	});

	const user5 = await prisma.user.create({
		data: {
			name: 'Lídia Sampaio',
			normalizedName: 'lidia sampaio',
			email: 'lidia@pawpal.com',
			password: 'senha123',
			phone: '11988888888',
			role: 'MONITOR',
			profilePicture: 'https://example.com/perfil-maria.jpg',
		},
	});

	const pet1 = await prisma.pet.create({
		data: {
			name: 'Cutie',
			normalizedName: 'cutie',
			age: 2,
			tutorId: user1.id,
			type: 'DOG',
			breed: 'SRD',
			sex: 'MALE',
			neutered: true,
			profilePicture: 'https://example.com/foto-guib.jpg',
		},
	});

	const pet2 = await prisma.pet.create({
		data: {
			name: 'Marie',
			normalizedName: 'marie',
			tutorId: user2.id,
			age: 2,
			breed: 'SRD',
			type: 'DOG',
			sex: 'FEMALE',
			neutered: false,
			profilePicture: 'https://example.com/foto-marie.jpg',
		},
	});
	const pet3 = await prisma.pet.create({
		data: {
			name: 'Bethânia',
			normalizedName: 'bethania',
			tutorId: user1.id,
			age: 2,
			breed: 'SRD',
			type: 'DOG',
			sex: 'FEMALE',
			neutered: false,
			profilePicture: 'https://example.com/foto-marie.jpg',
		},
	});

	const photo = await prisma.photo.create({
		data: {
			url: 'https://example.com/foto-fofa.jpg',
			pets: {
				create: [{ petId: pet1.id }, { petId: pet2.id }],
			},
		},
	});

	console.log('Seed concluído com sucesso!');
}

main()
	.catch((e) => {
		console.error('Erro no seed:', e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
