import SQ from "sequelize";
import dotenv from "dotenv";
import { config } from "../config/config.js";

dotenv.config();

const Sequelize = SQ.Sequelize;
const { host, database, user, password } = config.db;
const usingLog = process.env["NODE_ENV"] === "dev" ? true : false;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: usingLog,
});
