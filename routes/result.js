const express = require("express");
const router = express.Router();
const https = require("https");
require('dotenv').config();

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apikey = process.env.API_KEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  https.get(url, (response) => {
    if (response.statusCode === 404) {
      req.flash("error", "Please enter the correct city name.");
      res.redirect("/");
    } else {
      response.on("data", (data) => {
        var weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        var icon =
          "https://openweathermap.org/img/wn/" +
          weatherData.weather[0].icon +
          "@2x.png";
        res.render("results", {
          cityName : query,
          time : new Date().getHours()+':'+new Date().getMinutes(),
          weatherData: weatherData.visibility,
          windSpeed : windSpeed,
          temperature: temp,
          description: description,
          image: icon,
        });
      });
    }
  });
});

module.exports = router;
