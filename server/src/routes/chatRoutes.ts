import express from 'express';
import { generateText } from '../controllers/chatController';

const router = express.Router();

// Change this to use /generateText endpoint directly
router.post('/generateText', generateText);  // Match the frontend call

export default router;