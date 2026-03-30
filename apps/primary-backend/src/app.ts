import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { app as apiKeyApp } from "./modules/apiKeys";
import { app as models } from "./modules/models";
import { app as payments } from "./modules/payments";

export const app = new Elysia()
  .use(auth)
  .use(apiKeyApp)
  .use(models)
  .use(payments);

export type App = typeof app;

/*
  auth => signup, signin
  api-key => create api key, get api key, delete api key and disable api key
  model => get all the supported models, their pricing and providers
  payment => rzp/stripe
 */
