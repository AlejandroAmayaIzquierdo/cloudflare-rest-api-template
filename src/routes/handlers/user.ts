import { Hono } from "hono";
import { StatusCode } from "hono/utils/http-status";
import {
  loginController,
  signupController,
} from "../../controllers/userController";

const user = new Hono<{ Bindings: Api.Bindings }>();

user.post("/login", async (c) => {
  try {
    const session = await loginController(c);
    const response: Api.Response = {
      status: 1,
      result: session,
    };
    c.status(202);
    return c.json(response);
  } catch (err) {
    const error = err as Api.Error;
    c.status((error.code as StatusCode) ?? 500);
    return c.json(error);
  }
});

user.post("/signup", async (c) => {
  try {
    const session = await signupController(c);
    const response: Api.Response = {
      status: 1,
      result: session,
    };
    c.status(202);
    return c.json(response);
  } catch (err) {
    const error = err as Api.Error;
    c.status((error.code as StatusCode) ?? 500);
    return c.json(error);
  }
});

export default user;
