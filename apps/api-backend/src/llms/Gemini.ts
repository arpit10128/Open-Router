import { Messages } from "../types";
import { BaseLlm, LlmResponse } from "./Base";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export class Gemini extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
  ): Promise<LlmResponse> {
    const response = await ai.models.generateContent({
      model: model,
      contents: messages.map((message) => ({
        text: message.content,
        role: message.role,
      })),
    });

    return {
      inputTokenConsumed:
        response.usageMetadata?.promptTokenCount!,
      outputTokenConsumed:
        response.usageMetadata?.candidatesTokenCount!,
      completions: {
        choices: [
          {
            message: {
              content: response.text!,
            },
          },
        ],
      },
    };
  }
}
