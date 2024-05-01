import { Env, Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

import routes from "./routes";
import { handleCronJobs } from "./Cron/cronManager";

const app = new Hono<{ Bindings: Api.Bindings }>();

routes.forEach((route) => {
  if (route.authMiddleware)
    app.use(
      `${route.path}/*`,
      bearerAuth({ verifyToken: route.authMiddleware })
    );
  app.route(route.path, route.handler);
});

export default {
  fetch: app.fetch,
  scheduled: handleCronJobs,
};
