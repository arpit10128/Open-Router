import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { app as apiKeyApp } from "./modules/apiKeys";
import { app as models } from "./modules/models";

const app = new Elysia()
  .use(auth)
  .use(apiKeyApp)
  .use(models)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

/*
  auth => signup, signin
  api-key => create api key, get api key, delete api key and disable api key
  model => get all the supported models, their pricing and providers
  payment => rzp/stripe
 */
