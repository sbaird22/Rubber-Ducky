import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const signToken = (username: string, email: string, _id: unknown) => {
    const payload = { username, email, _id };
    const secretKey: any = process.env.JWT_SECRET_KEY;
    return jwt.sign({data: payload}, secretKey, {expiresIn: '1h'});
};

const secretKey: string = process.env.JWT_SECRET || 'default_secret';

export const authenticateToken = ({req}: any) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if(req.headers.authorization){
        token = token.split(' ').pop().trim();
    };
    if(!token){
        return req;
    }
    try{
        const {data}: any = jwt.verify(token, secretKey);
        req.user = data;
    }catch (err) {
        console.log('Invalid Token.');
    }
    return req;
};

export class AuthenticationError extends GraphQLError {
    constructor(message: string) {
        super(message, undefined, undefined, undefined, ['UNAUTHENITCATED']);
        Object.defineProperty(this, 'name', {value: 'AuthenticationError'})
    }
};

// If we want to add refresh tokens we will need to extend this file