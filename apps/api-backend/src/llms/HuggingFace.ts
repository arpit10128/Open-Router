import {
  InferenceClient,
  InferenceClientError,
} from "@huggingface/inference";
import { BaseLlm, LlmResponse } from "./Base";
import { Messages } from "../types";

const HUGGING_FACE_API_KEY =
  process.env.HUGGING_FACE_API_KEY!;

const client = new InferenceClient(HUGGING_FACE_API_KEY);

export class Huggingface extends BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
  ): Promise<LlmResponse> {
    try {
      const response = await client.chatCompletion({
        model: model,
        messages: messages.map((message) => ({
          text: message.content,
          role: message.role,
        })),
      });

      console.log(response);

      return {
        inputTokenConsumed: response.usage.prompt_tokens,
        outputTokenConsumed:
          response.usage.completion_tokens,
        completions: {
          choices: [
            {
              message: {
                content:
                  response.choices[0].message.content!,
              },
            },
          ],
        },
      };
    } catch (error) {
      if (error instanceof InferenceClientError) {
        console.error("Inference error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }
}
