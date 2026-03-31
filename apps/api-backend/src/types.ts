import { t } from "elysia";

export const Messages = t.Array(
  t.Object({
    role: t.Enum({
      user: "user",
      assistant: "assistant",
    }),
    content: t.String(),
  }),
);

export type Messages = typeof Messages.static;

export const Conversations = t.Object({
  model: t.String(),
  messages: Messages,
});

export type Conversations = typeof Conversations.static;
