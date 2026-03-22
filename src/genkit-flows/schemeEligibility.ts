'use server';
/**
 * @fileOverview This file implements the schemeEligibility Genkit flow.
 *
 * - schemeEligibility - A function that evaluates user eligibility for government welfare schemes.
 * - SchemeEligibilityInput - The input type for the schemeEligibility function.
 * - SchemeEligibilityOutput - The return type for the schemeEligibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define the schema for a single scheme as it would be passed to the AI for evaluation.
const SchemeDetailsForEvaluationSchema = z.object({
  id: z.string().describe('Unique ID of the scheme.'),
  name: z.string().describe('Name of the government welfare scheme.'),
  ministry: z.string().describe('The ministry or department managing the scheme.'),
  category: z.string().describe('The category of the scheme (e.g., Agriculture, Education, Health).'),
  description: z.string().describe('A brief description of the scheme.'),
  eligibilityCriteria: z.object({
    age: z.string().optional().describe('Age criteria, e.g., "18-60 years", "above 65", "below 18".'),
    income: z.string().optional().describe('Income criteria, e.g., "below 2.5 LPA", "no income limit".'),
    state: z.string().optional().describe('State-specific eligibility, e.g., "Maharashtra", "All India".'),
    gender: z.string().optional().describe('Gender-specific eligibility, e.g., "Female", "Male", "All".'),
    casteCategory: z.string().optional().describe('Caste category, e.g., "SC", "ST", "OBC", "General", "All".'),
    occupation: z.string().optional().describe('Occupation-specific eligibility, e.g., "Farmer", "Student", "Unemployed".'),
    familySize: z.string().optional().describe('Family size criteria, e.g., "single parent", "family with 2 children".'),
    disabilityStatus: z.string().optional().describe('Disability status criteria, e.g., "Must be a person with disability", "No disability required".'),
  }).optional().describe('Detailed eligibility conditions for the scheme as natural language strings.'),
});

// 2. Define the input schema for the flow
const SchemeEligibilityInputSchema = z.object({
  userProfile: z.object({
    age: z.number().describe('User current age.'),
    income: z.number().describe('User annual income in Rupees (LPA).'),
    state: z.string().describe('User residential state in India.'),
    gender: z.string().describe('User gender (e.g., "Male", "Female", "Other").'),
    occupation: z.string().describe('User occupation.'),
    casteCategory: z.string().describe('User caste category (e.g., "SC", "ST", "OBC", "General").'),
    disabilityStatus: z.boolean().describe('True if user has a disability, false otherwise.'),
    familySize: z.number().describe('Number of members in the user\'s family.'),
  }).describe('The personal profile of the user.'),
  schemes: z.array(SchemeDetailsForEvaluationSchema).describe('A list of government welfare schemes to evaluate against the user profile.'),
});

export type SchemeEligibilityInput = z.infer<typeof SchemeEligibilityInputSchema>;

// 3. Define the output schema for the flow
const SchemeEligibilityOutputSchema = z.array(
  z.object({
    schemeId: z.string().describe('Unique ID of the matched scheme.'),
    name: z.string().describe('Name of the government welfare scheme.'),
    matchScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the eligibility match percentage.'),
    matchReason: z.string().describe('A concise, one-sentence explanation of why the scheme is a good match or why it has a specific score.'),
    missingCriteria: z.array(z.string()).describe('A list of eligibility criteria that the user does NOT meet for this scheme, if any.'),
  })
).describe('A ranked list of top 10 schemes with eligibility match scores and reasons.');

export type SchemeEligibilityOutput = z.infer<typeof SchemeEligibilityOutputSchema>;

// 4. Define the prompt
const schemeEligibilityPrompt = ai.definePrompt({
  name: 'schemeEligibilityPrompt',
  input: { schema: SchemeEligibilityInputSchema },
  output: { schema: SchemeEligibilityOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert Government Financial Inclusion Assistant named GovFinAI. Your task is to evaluate a user's eligibility for various government welfare schemes based on their personal profile.

User Profile:
- Age: {{{userProfile.age}}}
- Annual Income: INR {{{userProfile.income}}} LPA
- State: {{{userProfile.state}}}
- Gender: {{{userProfile.gender}}}
- Occupation: {{{userProfile.occupation}}}
- Caste Category: {{{userProfile.casteCategory}}}
- Disability Status: {{#if userProfile.disabilityStatus}}Yes{{else}}No{{/if}}
- Family Size: {{{userProfile.familySize}}}

Evaluate the provided list of government schemes against the user's profile. For each scheme, determine a 'matchScore' from 0 to 100, where 100 means full eligibility and 0 means no eligibility. Provide a 'matchReason' (a single sentence) explaining the score, and list any 'missingCriteria' that the user does not meet.

Output only the top 10 schemes with the highest match scores, sorted in descending order of matchScore. Ensure the output strictly adheres to the JSON schema provided.

List of Schemes to Evaluate:
{{#each schemes}}
Scheme ID: {{{this.id}}}
Scheme Name: {{{this.name}}}
Ministry: {{{this.ministry}}}
Category: {{{this.category}}}
Description: {{{this.description}}}
Eligibility Criteria:
  {{#if this.eligibilityCriteria.age}}  - Age: {{{this.eligibilityCriteria.age}}}{{/if}}
  {{#if this.eligibilityCriteria.income}}  - Income: {{{this.eligibilityCriteria.income}}}{{/if}}
  {{#if this.eligibilityCriteria.state}}  - State: {{{this.eligibilityCriteria.state}}}{{/if}}
  {{#if this.eligibilityCriteria.gender}}  - Gender: {{{this.eligibilityCriteria.gender}}}{{/if}}
  {{#if this.eligibilityCriteria.casteCategory}}  - Caste Category: {{{this.eligibilityCriteria.casteCategory}}}{{/if}}
  {{#if this.eligibilityCriteria.occupation}}  - Occupation: {{{this.eligibilityCriteria.occupation}}}{{/if}}
  {{#if this.eligibilityCriteria.familySize}}  - Family Size: {{{this.eligibilityCriteria.familySize}}}{{/if}}
  {{#if this.eligibilityCriteria.disabilityStatus}}  - Disability Status: {{{this.eligibilityCriteria.disabilityStatus}}}{{/if}}
---
{{/each}}
`,
});

// 5. Define the flow
const schemeEligibilityFlow = ai.defineFlow(
  {
    name: 'schemeEligibilityFlow',
    inputSchema: SchemeEligibilityInputSchema,
    outputSchema: SchemeEligibilityOutputSchema,
  },
  async (input) => {
    const { output } = await schemeEligibilityPrompt(input);
    const sortedAndSlicedOutput = output
      ?.sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10) || [];

    return sortedAndSlicedOutput;
  }
);

// 6. Define the exported wrapper function
export async function schemeEligibility(input: SchemeEligibilityInput): Promise<SchemeEligibilityOutput> {
  return schemeEligibilityFlow(input);
}
