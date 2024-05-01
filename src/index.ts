import { Hono } from "hono";
import user from "./routes/user";

const app = new Hono<{ Bindings: Api.Bindings }>();

app.route("/user", user);

export default app;
