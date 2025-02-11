import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
    } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
    } catch (error) {
    res.status(401).json({ message: (error as Error).message });
    }
};


// Handles Express route logic