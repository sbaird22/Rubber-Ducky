import { Request, Response } from 'express';
import axios from 'axios';

// Define the expected structure of the response from OpenAI API
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateText = async (req: Request, res: Response) => {
  try {
    // Check if the prompt is provided
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Make the API request and type the response
    const response = await axios.post<OpenAIResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Check if the response has choices and the message content
    if (response.data.choices && response.data.choices.length > 0) {
      return res.json({ response: response.data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'No AI response received' });
    }
  } catch (error) {
    console.error('Error in AI request:', error);
    return res.status(500).json({ error: 'AI request failed' });
  }
};
