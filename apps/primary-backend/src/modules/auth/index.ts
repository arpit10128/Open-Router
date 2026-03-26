import { Elysia, Cookie } from "elysia";
import { AuthModel } from "./model";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const userId = await AuthService.signup(
          body.email,
          body.password,
        );
        return {
          id: userId,
        };
      } catch (e) {
        return status(400, {
          message: "Error while signup",
        });
      }
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
    async ({ jwt, body, status, cookie: { auth } }) => {
      const { correctCredentials, userId } =
        await AuthService.signin(body.email, body.password);

      if (correctCredentials && userId) {
        const token = await jwt.sign({ userId });

        if (!auth) {
          auth = new Cookie("auth", {});
        }

        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400,
        });

        return {
          message: "Signed in successfully",
        };
      } else {
        return status(403, {
          message: "Invalid credentials",
        });
      }
    },
    {
      body: AuthModel.signInSchema,
      response: {
        200: AuthModel.signInResponseSchema,
        403: AuthModel.signInInvalid,
      },
    },
  );
