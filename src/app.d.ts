declare namespace App {
  interface Route {
    path: string;
    handler: import("hono").Hono<any, any, string>;
    authMiddleware?: (token: string, c: any) => Promise<boolean>;
  }
}

declare namespace Api {
  interface Response {
    status: number;
    error?: string | number | object | boolean | unknown;
    result?: string | number | object | boolean | unknown;
  }

  interface RegisterUserBody {
    userName: string;
    password: string;
  }

  type Bindings = {
    DB: D1Database;
    MY_BUCKET: R2Bucket;
  };
  interface Error {
    code: number;
    message: string;
  }
}
/// <reference types="lucia" />
declare namespace Lucia {
  type Providers = "id" | "google" | "twitch" | "github";

  type DatabaseUserAttributes = {
    userName: string;
    profilePic?: string;
    profileName?: string;
    github_id?: string;
  };

  type DatabaseSessionAttributes = {};
  interface User {
    userId: string;
    providerId: string;
    providerUserId: string;
    passwordDefined: boolean;
  }
  interface Session {
    user: User;
    sessionId: string;
    activePeriodExpiresAt: string;
    idlePeriodExpiresAt: string;
    state: string;
    fresh: boolean;
  }
}
