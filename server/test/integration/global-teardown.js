import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default async function teardown() {
  return new Promise(async (resolve) => {
    const connection = await mysql.createConnection({
      host: process.env["DB_HOST"],
      user: process.env["DB_USER"],
      database: process.env["DB_DATABASE"],
      password: process.env["DB_PASSWORD"],
    });

    try {
      await connection.execute("DROP TABLE storyhearts, storyimages, storytags, stories, tags, users");
    } catch (e) {
      console.log(e);
    } finally {
      connection.end();
    }

    resolve();
  });
}
