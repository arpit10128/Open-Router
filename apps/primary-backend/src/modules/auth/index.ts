import { Elysia } from "elysia";
import { AuthModel } from "./model";
import { AuthService } from "./service";

export const auth = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-up",
    async ({ body }) => {
      const userId = await AuthService.signup(
        body.email,
        body.password,
      );
      return {
        id: userId,
      };
    },
    {
      body: AuthModel.signUpSchema,
      response: {
        200: AuthModel.signUpResponseSchema,
        400: AuthModel.signUpInvalid,
      },
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const token = await AuthService.signin(
        body.email,
        body.password,
      );
      return {
        token,
      };
    },
    {
      body: AuthModel.signInSchema,
      response: {
        200: AuthModel.signInResponseSchema,
        400: AuthModel.signInInvalid,
      },
    },
  );
