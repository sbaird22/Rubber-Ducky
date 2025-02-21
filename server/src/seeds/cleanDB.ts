import { Bug, User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
    try {
        await Bug.deleteMany({});
        console.log('Bug collection cleaned.');

        await User.deleteMany({});
        console.log('User collection cleaned.');
    }catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};

export default cleanDB;