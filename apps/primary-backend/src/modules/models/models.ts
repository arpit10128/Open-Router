import { t } from "elysia";

export namespace modelsModel {
  export const getModelsResponseSchema = t.Object({
    models: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String(),
        slug: t.String(),
        company: t.Object({
          id: t.Number(),
          name: t.String(),
          website: t.String(),
        }),
      }),
    ),
  });

  export type getModelsResponseSchema =
    typeof getModelsResponseSchema.static;

  export const getProvidersResponseSchema = t.Object({
    providers: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String(),
        website: t.String(),
      }),
    ),
  });

  export type getProvidersResponseSchema =
    typeof getProvidersResponseSchema.static;

  export const getModelsProvidersResponseSchema = t.Object({
    providers: t.Array(
      t.Object({
        id: t.Number(),
        providerId: t.Number(),
        providerName: t.String(),
        providerWebsite: t.String(),
        inputTokenCost: t.Number(),
        outputTokenCost: t.Number(),
      }),
    ),
  });

  export type getModelsProvidersResponseSchema =
    typeof getModelsProvidersResponseSchema.static;
}
