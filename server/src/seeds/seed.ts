import connectDB from "../config/db.js";
import { Bug, User } from '../models/index.js';
import cleanDB from "./cleanDB";
import userData from './userData.json' with {type: 'json'};
import bugData from './bugData.json' with {type: 'json'};

const seedDatabase = async (): Promise<void> => {
    try{
        await connectDB();
        await cleanDB();
        await Bug.insertMany(bugData);
        await User.create(userData);
        console.log('Seeding was successful!');
        process.exit(0);
    }catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();