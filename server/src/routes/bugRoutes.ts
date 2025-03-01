import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { addBug, getBug, deleteBug } from "../controllers/bugController.js";

const router = express.Router();

router.post("/", authenticateToken, addBug); // Ensure user is authenticated
router.get("/user/:userId", authenticateToken, getBug);
router.delete("/:bugId", authenticateToken, deleteBug);


export default router;
