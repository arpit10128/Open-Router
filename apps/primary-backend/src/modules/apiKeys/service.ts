import { prisma } from "db";

const API_KEY_LENGTH = 20;
const ALPHABET_SET =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM@#$*";

export abstract class ApiKeyService {
  static createRandomApiKey() {
    let suffixKey = "";
    for (let i = 0; i < API_KEY_LENGTH; i++) {
      suffixKey += Math.floor(
        Math.random() * ALPHABET_SET.length,
      );
    }
    return `sk-or-v1-${suffixKey}`;
  }

  static async createApiKey(
    name: string,
    userId: number,
  ): Promise<{
    id: string;
    apiKey: string;
  }> {
    const apiKey = ApiKeyService.createRandomApiKey();
    const apiKeyDb = await prisma.apiKey.create({
      data: {
        name,
        apiKey,
        userId,
      },
    });

    return {
      id: apiKeyDb.id.toString(),
      apiKey,
    };
  }

  static async getApiKeys(userId: number) {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
        deleted: false,
      },
    });

    return apiKeys.map((apiKey) => ({
      id: apiKey.id.toString(),
      name: apiKey.name,
      apiKey: apiKey.apiKey,
      lastUsed: apiKey.lastUsed,
      creditsConsumed: apiKey.creditsConsumed,
      disabled: apiKey.disabled,
    }));
  }

  static async updateApiKeyDisable(
    apiKeyId: number,
    userId: number,
    disabled: boolean,
  ) {
    await prisma.apiKey.update({
      where: {
        id: apiKeyId,
        userId,
      },
      data: {
        disabled,
      },
    });
  }

  static async deleteApiKey(id: number, userId: number) {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
