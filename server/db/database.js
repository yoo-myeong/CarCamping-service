import SQ from "sequelize";
import { config } from "../config.js";

const Sequelize = SQ.Sequelize;
const { host, database, user, password, port } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
