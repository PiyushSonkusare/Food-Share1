
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Initializes the Google GenAI client.
 * The API key is sourced from the environment variable as per project requirements.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface VerificationResult {
  isSafe: boolean;
  confidence: number;
  description: string;
  freshnessScore: number;
}

/**
 * Verifies the freshness and safety of food using the Gemini AI vision capabilities.
 * @param base64Image - The image data, either as a base64 string or a data URL.
 * @returns A VerificationResult object parsed from the AI's JSON output.
 */
export const verifyFoodImage = async (base64Image: string): Promise<VerificationResult> => {
  try {
    // Normalize image data to extract raw base64 if it's a data URL
    const imageData = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: 'image/jpeg'
            }
          },
          {
            text: "Evaluate the food item in this image for donation safety. Check for signs of spoilage, bruising, mold, or poor storage conditions. Determine if it is 'Safe' or 'Unsafe' to give to someone in need."
          }
        ]
      },
      config: {
        systemInstruction: "You are an expert food safety auditor. Provide a technical assessment of food freshness from photographs. Your goal is to prevent food-borne illnesses in food donation programs. Output must be strictly valid JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { 
              type: Type.BOOLEAN, 
              description: "True if the food appears fresh and safe for consumption." 
            },
            confidence: { 
              type: Type.NUMBER, 
              description: "Confidence in the assessment from 0.0 to 1.0." 
            },
            description: { 
              type: Type.STRING, 
              description: "A short, professional summary of the visual inspection results (max 20 words)." 
            },
            freshnessScore: { 
              type: Type.NUMBER, 
              description: "A numeric score from 0 (rotten/unusable) to 100 (perfectly fresh)." 
            }
          },
          required: ["isSafe", "confidence", "description", "freshnessScore"]
        }
      }
    });

    const output = response.text;
    if (!output) {
      throw new Error("Empty response from AI service");
    }

    return JSON.parse(output) as VerificationResult;
  } catch (error) {
    console.error("Gemini Food Verification Failure:", error);
    // Return a safe fallback that requires manual human intervention if the API fails
    return {
      isSafe: true,
      confidence: 0,
      description: "AI analysis unavailable. Please perform a manual freshness check before proceeding.",
      freshnessScore: 50
    };
  }
};
