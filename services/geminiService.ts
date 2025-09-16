
import { GoogleGenAI, Type } from "@google/genai";
import type { RefuelRecord } from '../types';

// IMPORTANT: This service assumes the API key is set in the environment.
// In a real application, this file would run on a secure server (e.g., Vercel Serverless Function)
// and not expose the API key to the client.

// Fix: Removed mock 'process.env' to align with API key handling guidelines.
// The app should rely on the build environment to provide process.env.API_KEY.
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY && process.env.API_KEY !== "YOUR_API_KEY_HERE") {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (e) {
    console.error("Failed to initialize GoogleGenAI", e);
}


const refuelSchema = {
    type: Type.OBJECT,
    properties: {
        liters: {
            type: Type.NUMBER,
            description: "The amount of fuel added in liters. E.g., 12.5"
        },
        cost: {
            type: Type.NUMBER,
            description: "The total cost of the refuel in the local currency. E.g., 25.40"
        },
        notes: {
            type: Type.STRING,
            description: "Any extra notes from the text, like 'used premium fuel' or 'paid with card'."
        }
    },
    required: ["liters", "cost"]
};


export const parseRefuelLog = async (text: string, distanceSinceLast: number): Promise<Omit<RefuelRecord, 'id' | 'date'>> => {
  if (!ai) {
    console.warn("Gemini AI not initialized. Using mock data. Please provide a valid API key.");
    // Return mock data if AI is not configured
    return {
        liters: 10 + Math.random() * 5,
        cost: 20 + Math.random() * 10,
        distanceSinceLast,
        notes: "Mocked AI response.",
    };
  }

  try {
    const prompt = `Parse the following text to extract refuel information. Today's date is ${new Date().toLocaleDateString()}. The distance since the last refuel was ${distanceSinceLast.toFixed(1)} km. Text: "${text}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: refuelSchema,
      },
    });

    const parsedJson = JSON.parse(response.text);

    return {
        liters: parsedJson.liters || 0,
        cost: parsedJson.cost || 0,
        distanceSinceLast: distanceSinceLast,
        notes: parsedJson.notes || '',
    };
  } catch (error) {
    console.error("Error parsing refuel log with Gemini:", error);
    throw new Error("Failed to get AI-powered insights. Please try again.");
  }
};
