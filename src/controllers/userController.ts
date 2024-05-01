import { Context } from "hono";
import { BlankInput } from "hono/types";
import { initializeLucia } from "../AuthManager";
import { createSession, createUser, getUser } from "../services/user";

export const signupController = async (
  c: Context<
    {
      Bindings: Api.Bindings;
    },
    "/signup",
    BlankInput
  >
) => {
  try {
    const { userName, password } = (await c.req.json()) as Api.RegisterUserBody;
    const auth = initializeLucia(c.env.DB);

    const user = await createUser(auth, "id", userName, password);

    if (!user) throw { message: "Error while creating the user", code: 406 };

    const session = await createSession(auth, user.userId);

    if (!session)
      throw { message: "Error while creating the session", code: 403 };
    return session;
  } catch (err) {
    const error = err as Api.Error;
    throw { message: error.message, code: error.code };
  }
};

export const loginController = async (
  c: Context<
    {
      Bindings: Api.Bindings;
    },
    "/login",
    BlankInput
  >
) => {
  try {
    const { userName, password } = (await c.req.json()) as {
      userName: string;
      password: string;
    };

    const auth = initializeLucia(c.env.DB);

    const user = await getUser(auth, "id", userName, password);
    const session = await createSession(auth, user.userId);

    if (!session) throw { message: "Error while Login", code: 403 };

    return session;
  } catch (err) {
    const error = err as Api.Error;
    throw { message: error.message, code: error.code };
  }
};
