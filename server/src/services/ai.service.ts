import {
  SummarizeInput,
  RewriteInput,
  TranslateInput,
} from "../validators/ai.schema";
import { notesService } from "./notes.service";
import { geminiService } from "./gemini.service";
import translateAPI from "google-translate-api-x";

export class AiService {
  async summarize(
    userId: string,
    input: SummarizeInput,
  ): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error("No text to summarize");
    }

    const result = await geminiService.summarize(text);
    return { result };
  }

  async rewrite(
    userId: string,
    input: RewriteInput,
  ): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error("No text to rewrite");
    }

    const result = await geminiService.rewrite(text, input.mode);
    return { result };
  }

  async translate(
    userId: string,
    input: TranslateInput,
  ): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error("No text to translate");
    }

    // Auto-detects language and translates to the opposite (EN↔AR)
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const targetLang = isArabic ? "en" : "ar";
    const translationDoc = await translateAPI(text, { to: targetLang });
    return { result: translationDoc.text };
  }
}

export const aiService = new AiService();
