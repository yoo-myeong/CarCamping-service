import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth/auth.router.js";
import storyRoutes from "./router/story/story.router.js";
import shopRoutes from "./router/shop/shop.router.js";
import taglistRoutes from "./router/taglist/taglist.router.js";
import { sequelize } from "./db/database.js";
import { config } from "./config.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/auth", authRoutes);
app.use("/story", storyRoutes);
app.use("/shop", shopRoutes);
app.use("/taglist", taglistRoutes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`server starts on ${config.port}...!!!`);
  });
});
