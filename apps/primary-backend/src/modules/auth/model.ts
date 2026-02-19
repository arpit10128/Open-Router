import { t } from "elysia";

export namespace AuthModel {
  export const signInSchema = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type signInSchema = typeof signInSchema.static;

  export const signInResponseSchema = t.Object({
    token: t.String(),
  });

  export type signInResponseSchema =
    typeof signInResponseSchema.static;

  export const signInInvalid = t.Object({
    message: t.Literal("Invalid credentials"),
  });

  export type signInInvalid = typeof signInInvalid.static;

  export const signUpSchema = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type signUpSchema = typeof signUpSchema.static;

  export const signUpResponseSchema = t.Object({
    id: t.String(),
  });

  export type signUpResponseSchema =
    typeof signUpResponseSchema.static;

  export const signUpInvalid = t.Object({
    message: t.Literal("Error while signup"),
  });

  export type signUpInvalid = typeof signUpInvalid.static;
}
