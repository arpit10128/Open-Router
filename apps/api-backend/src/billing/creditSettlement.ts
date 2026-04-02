import { prisma } from "db";

export async function settleCredits(
  userId: number,
  reservedCredit: number,
  creditsUsed: number,
) {
  const diff = reservedCredit - creditsUsed;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      reservedCredits: { decrement: reservedCredit },
      credits:
        diff > 0
          ? { increment: diff }
          : { decrement: -diff },
    },
  });
}
