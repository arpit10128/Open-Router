import { Messages } from "../types";
import { estimatedToken } from "./creditEstimator";
import { getRate } from "./creditRate";

export async function estimatedCredits(
  prompt: Messages,
  model: string,
) {
  const estimatedTokenUsed: number =
    await estimatedToken(prompt);

  const modelRate: number = getRate(model);

  const estimatedCreditsUsed: number =
    (estimatedTokenUsed / 1000) * modelRate;

  return Math.ceil(estimatedCreditsUsed);
}
