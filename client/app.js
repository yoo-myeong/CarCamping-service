import express from "express";
import weatherRouter from "./router/weather.router.js";
import storyRouter from "./router/story.router.js";
import authRouter from "./router/auth.router.js";
import shopRouter from "./router/shop.router.js";
import morgan from "morgan";
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/weather", weatherRouter);
app.use("/story", storyRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);

app.all("/", (req, res, next) => {
  res.render("main.ejs");
});
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(5000);