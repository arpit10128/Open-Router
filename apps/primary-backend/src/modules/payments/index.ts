import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import { paymentsModel } from "./models";
import { prisma } from "db";
import { paymentsService } from "./service";

export const app = new Elysia({ prefix: "payments" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .resolve(async ({ cookie: { auth }, status, jwt }) => {
    if (!auth) {
      return status(401);
    }

    const decoded = await jwt.verify(auth.value as string);

    if (!decoded || !decoded.userId) {
      return status(401);
    }

    return {
      userId: decoded.userId as string,
    };
  })
  .post(
    "/onramp",
    async ({ userId, status }) => {
      try {
        const credits = await paymentsService.onramp(
          Number(userId),
        );

        return {
          message: "onramp successfull",
          credits,
        };
      } catch (e) {
        return status(411, {
          message: "Onramp failed",
        });
      }
    },
    {
      response: {
        200: paymentsModel.onrampResponseSchema,
        411: paymentsModel.onrampFailedResponseSchema,
      },
    },
  );
