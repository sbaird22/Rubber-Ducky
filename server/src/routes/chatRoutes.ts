import express from 'express';
import { generateText } from '../controllers/chatController.js';

const router = express.Router();

// Change this to use /generateText endpoint directly
router.get('/', generateText);  // Match the frontend call

export default router;