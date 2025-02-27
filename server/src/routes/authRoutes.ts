import express from 'express';
import { register, login, getUser } from '../controllers/authController.js'; 
import { authenticateToken } from '../utils/auth'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', authenticateToken, getUser); 

export default router;





