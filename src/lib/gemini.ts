import axios from 'axios';

const GEMINI_API_URL = 'https://generative-ai.googleapis.com/v1/gemini:generateText';

export const classifyEmail = async (content: string) => {
    const response = await axios.post(GEMINI_API_URL, {
        prompt: `Classify the email context and suggest a response:\n\n${content}`,
        model: "gemini-1.5-flash", // Ensure this is the correct model name
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
            'Content-Type': 'application/json',
        }
    });

    return response.data; // Modify based on actual response structure
};
