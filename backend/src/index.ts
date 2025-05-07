import { Role } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import prisma from './lib/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------------------------

// async function main() {
// 	const tutor = await prisma.user.create({
// 		data: {
// 			name: 'Adolfo',
// 			email: 'adolfo@exemplo.com',
// 			password: 'senhasegura123',
// 			role: Role.TUTOR,
// 		},
// 	});

// 	console.log('Tutor criado:', tutor);

// 	const dog = await prisma.dog.create({
// 		data: {
// 			name: 'Bruno',
// 			breed: 'Maltês',
// 			age: 3,
// 			tutorId: tutor.id,
// 		},
// 	});

// 	console.log('Cachorro criado:', dog);

// 	const photo = await prisma.photo.create({
// 		data: {
// 			url: 'https://exemplo.com/foto-do-rex.jpg',
// 			dogId: dog.id,
// 		},
// 	});

// 	console.log('Foto criada:', photo);
// }
app.get('/', (req, res) => {
	res.send('PawPal API funcionando 🐾');
});

app.post('/users', async (req, res) => {
 try {
	const {name, email, password, phone, role, dogs} = req.body;
 }
}

app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
