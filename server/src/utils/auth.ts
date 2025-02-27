import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
    interface Request {
        user?: { _id: string; username: string; email: string };
    }
}
import dotenv from "dotenv";

dotenv.config();

const secretKey: string = process.env.JWT_SECRET || "default_secret";

export const signToken = (username: string, email: string, _id: string) => {
    const payload = { username, email, _id };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extract token from 'Bearer TOKEN' format
    if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
    }

    if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
    }

    try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload & {_id:string};
    const { _id, username, email } = decoded;
    if (_id && username && email) {
        req.user = { _id, username, email }; // Attach decoded user data to request
        next(); // Proceed to next middleware
    } else {
        return res.status(401).json({ message: "Invalid Token" });
    }
    } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
    }
};

export class AuthenticationError extends Error {
    constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
    }
}
