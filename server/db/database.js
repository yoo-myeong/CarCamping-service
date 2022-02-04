import SQ from "sequelize";
import { config } from "../config/config.js";

const Sequelize = SQ.Sequelize;
const { host, database, user, password } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});
