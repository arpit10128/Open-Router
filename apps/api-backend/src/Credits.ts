import { prisma } from "db";
import { LlmResponse } from "./llms/Base";

export async function calculateCredits(
  response: LlmResponse,
  model: string,
  providerId: number,
) {
  const modelDb = await prisma.model.findFirst({
    where: {
      slug: model,
    },
  });
  const modelProvider =
    await prisma.modelProviderMapping.findFirst({
      where: {
        modelId: modelDb?.id,
        providerId,
      },
    });
  const inputCost =
    (response.inputTokenConsumed / 1000000) *
    modelProvider?.inputTokenCost!;

  const outputCost =
    (response.outputTokenConsumed / 1000000) *
    modelProvider?.outputTokenCost!;

  return Math.ceil(inputCost + outputCost);
}
