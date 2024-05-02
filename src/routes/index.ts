import { Context } from "hono";
import { verifySession } from "../AuthManager";

import user from "./handlers/user";
import storage from "./handlers/storage";
import example from "./handlers/Example";

const authMiddleware = async (token: string, c: Context) =>
  await verifySession(token, c);

const routes: App.Route[] = [
  { path: "/user", handler: user },
  { path: "/storage", handler: storage, authMiddleware: authMiddleware },
  { path: "/example", handler: example, authMiddleware: authMiddleware },
];

export default routes;
