import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import storyRouter from "./router/story.router.js";
import authRouter from "./router/auth.router.js";
import adminRouter from "./router/admin.router.js";
import { logger } from "./config/winston.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("short", { stream: logger.stream }));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.all("/", (req, res) => {
  res.render("main/main.ejs");
});

app.use("/story", storyRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.sendStatus(500);
});

const port = 8080;
app.listen(port, () => {
  logger.info(`server started on ${port}`);
});
