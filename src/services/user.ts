import { Auth } from "lucia";

export const createUser = async (
  auth: Auth,
  provider: Lucia.Providers,
  userName: string,
  password: string
) => {
  try {
    const user: Lucia.User = await auth.createUser({
      key: {
        providerId: provider,
        providerUserId: userName.toLocaleLowerCase(),
        password,
      },
      attributes: {
        userName: userName.toLocaleLowerCase(),
      },
    });
    return user;
  } catch (err) {
    throw { message: `${err}`, code: 500 };
  }
};

export const createSession = async (auth: Auth, userId: string) => {
  try {
    const session: Lucia.Session = await auth.createSession({
      userId,
      attributes: {},
    });
    return session;
  } catch (err) {
    throw { message: `${err}`, code: 500 };
  }
};

export const getUser = async (
  auth: Auth,
  provider: Lucia.Providers,
  providerUserId: string,
  password: string
): Promise<Lucia.User> => {
  try {
    const user = await auth.useKey(
      provider,
      providerUserId.toLocaleLowerCase(),
      password
    );
    return user;
  } catch (err) {
    throw { message: `${err}`, code: 401 };
  }
};
