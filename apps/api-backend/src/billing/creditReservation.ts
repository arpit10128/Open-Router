import { prisma } from "db";
import { Messages } from "../types";
import { estimatedCredits } from "./creditEstimatedCost";

export async function reservedCredits(
  userId: number,
  prompt: Messages,
  model: string,
) {
  const estimatedCreditsUsed = await estimatedCredits(
    prompt,
    model,
  );

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.credits < estimatedCreditsUsed) {
    throw new Error(
      "Invalid request. You don't have enough credits.",
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: estimatedCreditsUsed,
      },
      reservedCredits: {
        increment: estimatedCreditsUsed,
      },
    },
  });

  return estimatedCreditsUsed;
}
