import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService.js';
import  User  from '../models/User.js';

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

export const getUser = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user._id) {
            console.error("User not found in request");
            return res.status(401).json({ message: "Unauthorized, invalid token" });
        }
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};



// Handles Express route logic