import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyA5AHY8rKe6EUhIjSl4NOuEOzdIUgVQtnM" })],
  model: 'googleai/gemini-1.5-flash',
});
