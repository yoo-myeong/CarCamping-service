import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "./config.js";
import authRoutes from "./router/auth/auth.router.js";
import storyRoutes from "./router/story/story.router.js";
import shopRoutes from "./router/shop/shop.router.js";
import { sequelize } from "./db/database.js";
import "express-async-errors";

const app = express();

// const corsOption = {
//   origin: config.cors.allowedOrigin,
//   optionSuccessStatus: 200,
// };

app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/auth", authRoutes);
app.use("/story", storyRoutes);
app.use("/shop", shopRoutes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(config.port, () => {
    console.log(`server starts on ${config.port}...!!!`);
  });
});
