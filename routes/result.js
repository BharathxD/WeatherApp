const express = require("express");
const router = express.Router();
const https = require("https");
require("dotenv").config();

router("/")
  .get((req, res) => {
    //* GET
    res.render("home");
  })
  .post((req, res) => {
    //* POST
    const city = req.body.cityName;
    const apikey = process.env.API_KEY; //! Enter your API_KEY
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;
    https.get(url, (response) => {
      if (response.statusCode === 404) {
        req.flash("error", "Please enter the correct city name.");
        res.redirect("/");
      } else {
        response.on("data", async (data) => {
          let weatherData = await JSON.parse(data);
          let temp = weatherData.main.temp;
          let visibility = weatherData.visibility;
          let description = weatherData.weather[0].description;
          let windSpeed = weatherData.wind.speed;
          let time = `${new Date().getHours()}+${new Date().getMinutes()}`;
          var icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
          res.render("results", {
            cityName: query,
            time: time,
            visibility: visibility,
            windSpeed: windSpeed,
            temperature: temp,
            description: description,
            image: icon,
          });
        });
      }
    });
  });

module.exports = router;
