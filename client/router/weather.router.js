// API받아오는 방법을 기억하기 위한 임시 파일

import epxress from "express";
import fetch from "node-fetch";

const router = epxress.Router();

const API_KEY = "27cb26f13aaa445f65012bcbe8e9453f";

router.get("/", (req, res, next) => {
  const lat = 36.634624;
  const lon = 127.434752;
  console.log("you live in ", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.render("weather.ejs", data);
    });
});

export default router;
