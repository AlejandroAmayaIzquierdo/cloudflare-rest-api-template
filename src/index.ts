import { Hono } from "hono";
import user from "./routes/user";
import storage from "./routes/storage";

const app = new Hono<{ Bindings: Api.Bindings }>();

app.route("/user", user);
app.route("/storage", storage);

export default app;
