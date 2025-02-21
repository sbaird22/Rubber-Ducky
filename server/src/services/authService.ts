import User, { IUser } from '../models/User';
import { signToken } from '../utils/auth';
import mongoose from 'mongoose';


export const registerUser = async (
    username: string,
    email: string,
    password: string
): Promise<{ id: string; username: string; email: string; token: string }> => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const newUser = new User({ username, email, password });
    await newUser.save();

    return {
    id: String(newUser._id),
    username: newUser.username,
    email: newUser.email,
    token: signToken(String(newUser._id), String(newUser.email), String(newUser._id) ),
    };
};

/**
 * Logs in a user and returns a JWT.
 */
export const loginUser = async (
    email: string,
    password: string
): Promise<{ id: string; username: string; email: string; token: string }> => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) throw new Error('Invalid credentials');

    return {
    id: String(user._id), 
    username: user.username,
    email: user.email,
    token: signToken(String(user._id), String(user.email), String(user._id) ),
    };
};




// Handles register and login and account verification