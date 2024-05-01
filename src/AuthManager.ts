import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";

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

export type Auth = ReturnType<typeof initializeLucia>;
