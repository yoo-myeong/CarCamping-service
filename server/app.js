import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import { config } from "./config.js";
import placeInfoRoutes from "./router/placeInfo.router.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/placeInfo", placeInfoRoutes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(config.port);
