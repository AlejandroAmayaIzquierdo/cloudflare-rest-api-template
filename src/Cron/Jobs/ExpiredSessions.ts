export class SessionCron implements App.CronTask {
  public handle = async (db?: D1Database) => {
    if (!db) return;
    console.log("Deleting sessions expired...");

    await db
      .prepare(
        `DELETE FROM user_session WHERE idle_expires < ${new Date().getTime()}`
      )
      .run();
  };
}
