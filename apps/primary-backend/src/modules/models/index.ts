import Elysia from "elysia";
import { modelsModel } from "./models";
import { modelsService } from "./service";

export const app = new Elysia({ prefix: "models" })
  .get(
    "/",
    async () => {
      const models = await modelsService.getModels();
      return {
        models,
      };
    },
    {
      response: {
        200: modelsModel.getModelsResponseSchema,
      },
    },
  )
  .get(
    "/providers",
    async () => {
      const providers = await modelsService.getProviders();
      return {
        providers,
      };
    },
    {
      response: {
        200: modelsModel.getProvidersResponseSchema,
      },
    },
  )
  .get(
    "/:id/providers",
    async ({ params: { id } }) => {
      const providers =
        await modelsService.getModelsProviders(Number(id));

      return {
        providers,
      };
    },
    {
      response: {
        200: modelsModel.getModelsProvidersResponseSchema,
      },
    },
  );
