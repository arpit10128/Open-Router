import { Elysia } from "elysia";
import bearer from "@elysiajs/bearer";
import { prisma } from "db";
import { Conversations } from "./types";
import { Gemini } from "./llms/Gemini";
import { Huggingface } from "./llms/HuggingFace";
import { GroqApi } from "./llms/Groq";
import { LlmResponse } from "./llms/Base";
import { calculateCredits } from "./Credits";

const app = new Elysia()
  .use(bearer())
  .post(
    "/api/v1/chat/completions",
    async ({ bearer: apiKey, body, status }) => {
      const model = body.model;
      const [_CompanyName] = model.split("/");

      console.log(apiKey);
      const apiKeyDb = await prisma.apiKey.findUnique({
        where: {
          apiKey,
          disabled: false,
          deleted: false,
        },
        select: {
          user: true,
        },
      });

      if (!apiKeyDb) {
        return status(403, {
          message: "Invalid api key",
        });
      }

      if (apiKeyDb.user.credits <= 0) {
        return status(403, {
          message:
            "Invalid request. You don't have enough credits.",
        });
      }

      const modelDb = await prisma.model.findFirst({
        where: {
          slug: model,
        },
      });

      if (!modelDb) {
        return status(403, {
          message: "We don't support this model yet.",
        });
      }

      const providers =
        await prisma.modelProviderMapping.findMany({
          where: {
            modelId: modelDb.id,
          },
          include: {
            provider: true,
          },
        });

      if (providers.length === 0) {
        return status(403, {
          message: "No providers available for this model.",
        });
      }

      const provider =
        providers[
          Math.floor(Math.random() * providers.length)
        ];

      let response: LlmResponse | null = null;

      if (provider.provider.name == "Google Ai Studio") {
        const providerModelName = model.split("/")[1];
        response = await Gemini.chat(
          providerModelName,
          body.messages,
        );
      }

      if (provider.provider.name == "Groq") {
        const providerModelName = model;
        response = await GroqApi.chat(
          providerModelName,
          body.messages,
        );
      }

      if (provider.provider.name == "Hugging Face") {
        const providerModelName = model;
        response = await Huggingface.chat(
          providerModelName,
          body.messages,
        );
      }

      if (!response) {
        return status(403, {
          message: "No provider found for this model.",
        });
      }

      const creditsUsed = await calculateCredits(
        response,
        model,
        provider.provider.id,
      );

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: apiKeyDb.user.id,
          },
          data: {
            credits: {
              decrement: creditsUsed,
            },
          },
        }),
        prisma.apiKey.update({
          where: {
            apiKey,
          },
          data: {
            creditsConsumed: {
              increment: creditsUsed,
            },
            lastUsed: new Date(),
          },
        }),
      ]);

      return response;
    },
    {
      body: Conversations,
    },
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
