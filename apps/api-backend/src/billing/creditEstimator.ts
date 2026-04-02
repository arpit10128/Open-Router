import { Messages } from "../types";

export async function estimatedToken(
  prompt: Messages,
): Promise<number> {
  const contents = prompt.map((m) => m.content).join(" ");
  const maxOutputTokens: number = 1024;
  const estimatedInput = Math.ceil(contents.length / 4);

  return estimatedInput + maxOutputTokens;
}
