import User, { IUser } from '../models/User';
import { generateToken } from '../utils/jwtUtil';

export const registerUser = async (username: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const newUser = new User({ username, email, password });
    await newUser.save();

    return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    token: generateToken(newUser._id.toString()),
    };
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');

    return {
    id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id.toString()),
    };
};



// Handles register and login and account verification