import { Messages } from "../types";

export type LlmResponse = {
  inputTokenConsumed: number;
  outputTokenConsumed: number;
  completions: {
    choices: {
      message: {
        content: string;
      };
    }[];
  };
};

export class BaseLlm {
  static async chat(
    model: string,
    messages: Messages,
  ): Promise<LlmResponse> {
    throw new Error("Not implemented chat function");
  }
}
