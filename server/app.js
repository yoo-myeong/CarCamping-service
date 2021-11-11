import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "./config.js";
import authRoutes from "./router/auth.router.js";
import { sequelize } from "./db/database.js";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/auth", authRoutes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

sequelize.sync({ force: true }).then(() => {
  console.log("server starts");
  app.listen(config.port);
});
