'use server';
/**
 * @fileOverview A Genkit flow for a multilingual AI assistant that helps Indian citizens
 * with government schemes, personal finances, and policy explanations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData } from 'genkit/types';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe('The role of the message sender.'),
  content: z.string().describe('The textual content of the message.'),
});

const TransactionContextSchema = z.object({
  amount: z.number().describe('The amount of the transaction.'),
  category: z.string().describe('The category of the transaction.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction.'),
  note: z.string().describe('A short description.'),
  date: z.string().describe('The date in YYYY-MM-DD format.'),
});

const SavedSchemeContextSchema = z.object({
  schemeId: z.string(),
  name: z.string(),
  ministry: z.string(),
  category: z.string(),
  briefDescription: z.string().optional(),
});

const UserProfileSchema = z.object({
  name: z.string(),
  state: z.string(),
  age: z.number(),
  income: z.number(),
  occupation: z.string().optional(),
  casteCategory: z.string().optional(),
  gender: z.string().optional(),
  familySize: z.number().optional(),
  disability: z.string().optional(),
  language: z.string().optional(),
});

const MultilingualChatInputSchema = z.object({
  messages: z.array(ChatMessageSchema),
  userProfile: UserProfileSchema,
  targetLanguage: z.string(),
  recentTransactions: z.array(TransactionContextSchema).optional(),
  savedSchemes: z.array(SavedSchemeContextSchema).optional(),
});
export type MultilingualChatInput = z.infer<typeof MultilingualChatInputSchema>;

const MultilingualChatOutputSchema = z.string();
export type MultilingualChatOutput = z.infer<typeof MultilingualChatOutputSchema>;

export async function multilingualChat(input: MultilingualChatInput): Promise<MultilingualChatOutput> {
  return multilingualChatFlow(input);
}

const multilingualChatFlow = ai.defineFlow(
  {
    name: 'multilingualChatFlow',
    inputSchema: MultilingualChatInputSchema,
    outputSchema: MultilingualChatOutputSchema,
  },
  async (input) => {
    const { messages, userProfile, targetLanguage, recentTransactions, savedSchemes } = input;

    let systemInstruction = `You are GovFinAI Assistant, helping Indian citizens understand government welfare schemes and manage personal finances.
Always respond in ${targetLanguage}. Be empathetic, clear, and helpful.

USER PROFILE:
- Name: ${userProfile.name}
- State: ${userProfile.state}
- Age: ${userProfile.age}
- Income: ${userProfile.income} LPA
- Occupation: ${userProfile.occupation || 'N/A'}
- Gender: ${userProfile.gender || 'N/A'}
- Social Category: ${userProfile.casteCategory || 'General'}
- Disability: ${userProfile.disability || 'None'}`;

    if (recentTransactions && recentTransactions.length > 0) {
      systemInstruction += `\n\nRECENT TRANSACTIONS:\n${JSON.stringify(recentTransactions, null, 2)}`;
    }

    if (savedSchemes && savedSchemes.length > 0) {
      systemInstruction += `\n\nSAVED SCHEMES:\n${savedSchemes.map(s => `- ${s.name} (${s.ministry}, ${s.category})`).join('\n')}`;
    }

    const combinedMessages: MessageData[] = [];

    combinedMessages.push({
      role: 'system',
      content: [{ text: systemInstruction }],
    });

    messages.forEach(m => {
      combinedMessages.push({
        role: m.role as any,
        content: [{ text: m.content }]
      });
    });

    const { response } = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      messages: combinedMessages,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
