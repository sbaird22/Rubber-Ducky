import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        return null;
    }
};

export { generateToken, verifyToken };



// If we want to add refresh tokens we will need to extend this file