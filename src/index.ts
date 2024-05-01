import { Hono } from "hono";

import { bearerAuth } from "hono/bearer-auth";
import { verifySession } from "./AuthManager";

import user from "./routes/user";
import example from "./routes/Example";
import storage from "./routes/storage";

const app = new Hono<{ Bindings: Api.Bindings }>();

app.use(
  "/storage/*",
  bearerAuth({
    verifyToken: async (token, c) => await verifySession(token, c),
  })
);

app.use(
  "/example/*",
  bearerAuth({
    verifyToken: async (token, c) => await verifySession(token, c),
  })
);

app.route("/user", user);
app.route("/storage", storage);
app.route("/example", example);

export default app;
