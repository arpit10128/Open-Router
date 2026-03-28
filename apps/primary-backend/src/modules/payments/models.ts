import { t } from "elysia";

export namespace paymentsModel {
  export const onrampResponseSchema = t.Object({
    message: t.Literal("onramp successfull"),
    credits: t.Number(),
  });

  export type onrampResponseSchema =
    typeof onrampResponseSchema.static;

  export const onrampFailedResponseSchema = t.Object({
    message: t.Literal("Onramp failed"),
  });

  export type onrampFailedResponseSchema =
    typeof onrampFailedResponseSchema.static;
}
