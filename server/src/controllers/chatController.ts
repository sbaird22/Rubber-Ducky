import { Request, Response } from "express";
import axios from "axios";

export const generateText = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
};
