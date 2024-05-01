CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    userName TEXT NOT NULL UNIQUE,
    profilePic TEXT DEFAULT NULL,
    profileName TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_key (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL,
    hashed_password TEXT DEFAULT NULL,
    google_auth TEXT DEFAULT NULL,
    github_id TEXT DEFAULT NULL,
    github_auth TEXT DEFAULT NULL,
    twitch_auth TEXT DEFAULT NULL,
    twitch_id TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL,
    active_expires INTEGER NOT NULL,
    idle_expires INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
