import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/env";

class GeminiService {
  private client: GoogleGenerativeAI;
  private modelName: string;

  constructor() {
    if (!config.gemini.apiKey) {
      throw new Error(
        "GEMINI_API_KEY is required. Please set it in your .env file.",
      );
    }

    this.client = new GoogleGenerativeAI(config.gemini.apiKey);
    this.modelName = config.gemini.model;
  }

  async summarize(text: string): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: this.modelName,
      systemInstruction:
        "You are a helpful assistant that summarizes text concisely. Always respond in the same language as the input text.",
    });

    const prompt = `Please summarize the following text:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Failed to generate summary";
  }

  async rewrite(
    text: string,
    mode: "comedy" | "formal" | "casual",
  ): Promise<string> {
    const modeInstructions = {
      comedy:
        "Rewrite it in a humorous, witty, and entertaining tone. Add comedic elements while keeping the main message.",
      formal: "Rewrite it in a formal, professional tone.",
      casual: "Rewrite it in a casual, conversational tone.",
    };

    const model = this.client.getGenerativeModel({
      model: this.modelName,
      systemInstruction: `You are a helpful assistant that rewrites text. ${modeInstructions[mode]} Always respond in the same language as the input text.`,
    });

    const prompt = `Please rewrite the following text:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Failed to rewrite text";
  }
}

export const geminiService = new GeminiService();
