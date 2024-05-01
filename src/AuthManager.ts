import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { Context } from "hono";

export const initializeLucia = (db: D1Database) => {
  const auth = lucia({
    env: "DEV",
    adapter: d1(db, {
      user: "users",
      key: "user_key",
      session: "user_session",
    }),
    getUserAttributes: (data: Lucia.DatabaseUserAttributes) => {
      return {
        userName: data.userName,
      };
    },
  });
  return auth;
};

export const verifySession = async (
  token: string,
  c: Context<any, any, {}>
) => {
  try {
    const auth = initializeLucia(c.env.DB);
    const session: Lucia.Session = await auth.validateSession(token);
    return session.sessionId === token;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export type Auth = ReturnType<typeof initializeLucia>;
