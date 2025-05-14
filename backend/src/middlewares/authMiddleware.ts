import type { Role } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
	user?: {
		id: string;
		role: Role;
	};
}

export const authenticate = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Token não fornecido.' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, secret) as { id: string; role: Role };
		req.user = decoded;
		next();
	} catch (err: any) {
		return res.status(401).json({ error: 'Token inválido ou expirado.' });
	}
};

export const authorize = (allowedRoles: Role[]) => {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ error: 'Usuário não autenticado.' });
		}

		if (!allowedRoles.includes(req.user.role)) {
			return res.status(403).json({ error: 'Acesso negado.' });
		}

		next();
	};
};
