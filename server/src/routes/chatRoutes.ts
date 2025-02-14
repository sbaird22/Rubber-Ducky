import express from "express";
import { generateText } from "../controllers/chatController";

const router = express.Router();

router.post("/", generateText);

export default router;
