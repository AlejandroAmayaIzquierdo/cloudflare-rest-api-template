import { Env } from "hono";
import { SessionCron } from "./Jobs/ExpiredSessions";

export const handleCronJobs = async (
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext
) => {
  try {
    switch (event.cron) {
      case "0 0 * * *":
        new SessionCron().handle(env.Bindings?.D1 as D1Database);
        break;

      default:
        break;
    }
  } catch (error) {}
};
