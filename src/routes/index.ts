import { Context } from "hono";
import { verifySession } from "../AuthManager";

import user from "./user";
import storage from "./storage";
import example from "./Example";

const authMiddleware = async (token: string, c: Context) =>
  await verifySession(token, c);

const routes: App.Route[] = [
  { path: "/user", handler: user },
  { path: "/storage", handler: storage, authMiddleware: authMiddleware },
  { path: "/example", handler: example, authMiddleware: authMiddleware },
];

export default routes;
