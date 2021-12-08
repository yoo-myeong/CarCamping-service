import SQ from "sequelize";
import { config } from "../config.js";

const Sequelize = SQ.Sequelize;
const { database, user, password } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "mysql",
});
