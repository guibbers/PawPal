import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import prisma from './lib/prisma';
import petRoutes from './routes/petRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(petRoutes);

// ------------------------------------------------------------------------------------

app.get('/', (req, res) => {
	res.send('PawPal API funcionando 🐾');
});

app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
	await prisma.$disconnect();
	console.log('🔌 Conexão com o banco finalizada');
	process.exit(0);
});
