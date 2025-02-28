import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { addBug, getBug } from "../controllers/bugController.js";

const router = express.Router();

router.post("/", authenticateToken, addBug); // Ensure user is authenticated
router.get("/user", authenticateToken, getBug);


export default router;
