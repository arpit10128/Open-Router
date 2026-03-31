import { Elysia } from "elysia";
import bearer from "@elysiajs/bearer";
import { Conversations } from "./types";
import { Gemini } from "./llms/Gemini";
import { Huggingface } from "./llms/HuggingFace";
import { GroqApi } from "./llms/Groq";

const app = new Elysia()
  .use(bearer())
  .post(
    "/api/v1/chat/completions",
    async ({ bearer, body }) => {
      const model = body.model;
      const [CompanyName] = model.split("/");

      // console.log("Incoming model:", model);
      // console.log("Company:", CompanyName);

      if (CompanyName == "google") {
        const providerModelName = model.split("/")[1];
        const response = await Gemini.chat(
          providerModelName,
          body.messages,
        );
        return response;
      }

      if (CompanyName == "openai") {
        const providerModelName = model;
        const response = await GroqApi.chat(
          providerModelName,
          body.messages,
        );
        return response;
      }

      if (CompanyName == "meta-llama") {
        const providerModelName = model;
        const response = await Huggingface.chat(
          providerModelName,
          body.messages,
        );
        return response;
      }
    },
    {
      body: Conversations,
    },
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
