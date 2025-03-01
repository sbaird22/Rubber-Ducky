import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { addBug, getBug, deleteBug, addNoteToBug } from "../controllers/bugController.js";
import Bug from "../models/Bug.js";

const router = express.Router();

router.post("/", authenticateToken, addBug); // Ensure user is authenticated
router.get("/user/:userId", authenticateToken, getBug);
router.delete("/:bugId", authenticateToken, deleteBug);
router.post("/:bugId/note", authenticateToken, addNoteToBug);

router.get("/:bugId", authenticateToken, async (req, res) => {
    try {
        const { bugId } = req.params;
        console.log(bugId, "fetching bug id");
        const bug = await Bug.findById(bugId);
        if (!bug) {
        return res.status(404).json({ message: "Bug not found" });
        }
        res.json(bug);
        } catch (error) {
        res.status(500).json({ message: "Server error", error });
        }
    });


export default router;
