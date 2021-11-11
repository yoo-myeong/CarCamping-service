import SQ from "sequelize";
import { config } from "../config.js";

const Sequelize = SQ.Sequelize;
const { database, host, password } = config.db;

export const sequelize = new Sequelize(database, host, password, {
  host: "localhost",
  dialect: "mysql",
});
