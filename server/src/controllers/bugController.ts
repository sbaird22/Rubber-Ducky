import { Request, Response } from "express";
import Bug from "../models/Bug.js";

export const addBug = async (req: Request, res: Response) => {
    try {
    const { title, bugDescription } = req.body;
    
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const bug = new Bug({
        title,
        bugDescription,
        createdBy: req.user._id, // Store user ID who submitted
        attempts: [], // No attempts on initial submission
        });

    await bug.save();
    res.status(201).json({ message: "Bug submitted successfully!", bug });
    } catch (err) {
    console.error("Error adding bug:", err);
    res.status(500).json({ message: "Server error" });
    }
};

export const getBug = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Get bug ID from request parameters
        if (!userId) {
            return res.status(401).json({ message: "Bad request: No user ID provided" });
        }
        const bugs = await Bug.find({ createdBy: userId }).populate('createdBy', 'username email');
        if (!bugs.length) {
            return res.status(404).json({ message: "Bug not found" });
        }

        return res.status(200).json(bugs);
    } catch (err) {
        console.error("Error fetching bug:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
