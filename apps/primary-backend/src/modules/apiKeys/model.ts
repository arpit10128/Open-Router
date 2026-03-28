import { t } from "elysia";

export namespace ApiKeyModel {
  export const createApiKeySchema = t.Object({
    name: t.String(),
  });

  export type createApiKeySchema =
    typeof createApiKeySchema.static;

  export const createApiKeyResponseSchema = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });

  export type createApiKeyResponseSchema =
    typeof createApiKeyResponseSchema.static;

  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  });

  export type updateApiKeySchema =
    typeof updateApiKeySchema.static;

  export const updateApiKeyResponseSchema = t.Object({
    message: t.Literal("Updated api key successfully"),
  });

  export type updateApiKeyResponseSchema =
    typeof updateApiKeyResponseSchema.static;

  export const updateApiKeyFailedResponseSchema = t.Object({
    message: t.Literal("Updating api key unsuccessfull"),
  });

  export type updateApiKeyFailedResponseSchema =
    typeof updateApiKeyFailedResponseSchema.static;

  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        lastUsed: t.Nullable(t.Date()),
        creditsConsumed: t.Number(),
        disabled: t.Boolean(),
      }),
    ),
  });

  export type getApiKeyResponseSchema =
    typeof getApiKeyResponseSchema;

  export const deleteApiKeyResponseSchema = t.Object({
    message: t.Literal("Api key deleted successfully"),
  });

  export type deleteApiKeyResponseSchema =
    typeof deleteApiKeyResponseSchema.static;

  export const deleteApiKeyFailedResponseSchema = t.Object({
    message: t.Literal("Api key deletetion failed"),
  });

  export type deleteApiKeyFailedResponseSchema =
    typeof deleteApiKeyFailedResponseSchema.static;
}
