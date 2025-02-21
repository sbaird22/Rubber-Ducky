"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = void 0;
const axios_1 = __importDefault(require("axios"));
const generateText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the prompt is provided
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const response = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });
        // Check if the response has choices and the message content
        if (response.data.choices && response.data.choices.length > 0) {
            return res.json({ response: response.data.choices[0].message.content });
        }
        else {
            return res.status(500).json({ error: 'No AI response received' });
        }
    }
    catch (error) {
        console.error('Error in AI request:', error);
        return res.status(500).json({ error: 'AI request failed' });
    }
});
exports.generateText = generateText;
