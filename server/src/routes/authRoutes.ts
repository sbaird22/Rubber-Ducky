import express from 'express';
import { register, login } from '../controllers/authController.js';  // Ensure correct import path

const router = express.Router();

router.post('/register', register);  // Handle the POST /register route
router.post('/login', login);  // Handle the POST /register route

export default router;





// Server.ts file 
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db';
// import authRoutes from './auth/routes/authRoutes';

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// connectDB();
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
