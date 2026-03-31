import Groq from "groq-sdk";
import { BaseLlm, LlmResponse } from "./Base";
import { Messages } from "../types";

const GROQ_API_KEY = process.env.GROQ_API_KEY!;

const groq = new Groq({ apiKey: GROQ_API_KEY });

export class GroqApi extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
  ): Promise<LlmResponse> {
    const response = await groq.chat.completions.create({
      model: model,
      messages: messages.map((message) => ({
        content: message.content,
        role: message.role,
      })),
    });

    return {
      inputTokenConsumed: response.usage?.prompt_tokens!,
      outputTokenConsumed:
        response.usage?.completion_tokens!,
      completions: {
        choices: [
          {
            message: {
              content: response.choices[0].message.content!,
            },
          },
        ],
      },
    };
  }
}
