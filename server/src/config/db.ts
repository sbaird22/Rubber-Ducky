import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string, {

    });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;




// If using MongoDB Atlas, replace MONGO_URI with the cloud URL.