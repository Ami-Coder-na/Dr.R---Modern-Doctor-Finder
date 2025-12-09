import { GoogleGenAI, Type } from "@google/genai";
import { Specialty } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction to guide the AI to act as a medical receptionist
const SYSTEM_INSTRUCTION = `
You are Dr.R's AI Assistant. Your goal is to help users find the right medical specialist based on their symptoms.
Analyze the user's description and recommend the most appropriate specialty from the following list:
Cardiologist, Dermatologist, Neurologist, Pediatrician, Dentist, Orthopedic, General Physician, Psychiatrist.

If the input is casual conversation (hello, hi), respond politely and ask how you can help medically.
If the symptoms are unclear, ask for clarification.
If a specialty is clear, explain briefly why and suggest that specialty.

Keep responses concise, empathetic, and professional.
`;

export const getSpecialtyRecommendation = async (userUnput: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userUnput,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 150,
      }
    });

    return response.text || "I apologize, I couldn't understand that. Could you describe your symptoms differently?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently having trouble connecting to the server. Please browse our specialists manually.";
  }
};