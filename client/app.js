import express from "express";
import storyRouter from "./router/story.router.js";
import authRouter from "./router/auth.router.js";
import shopRouter from "./router/shop.router.js";
import morgan from "morgan";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.all("/", (req, res, next) => {
  res.render("main/main.ejs");
});

app.use("/story", storyRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);

app.all("/error", (req, res, next) => {
  throw new Error("server error");
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log(`server is started on 8080 port`);
});
