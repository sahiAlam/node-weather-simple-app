const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");

const PORT = 3000 || process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));

// get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// post request
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const units = "metric";
  const apiKey = "e4b5e67cabd71a20071ca30f3c126f4d";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${query}&appid=${apiKey}`;

  https.get(weatherURL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<h1>The Temperature in ${query} is ${temp} &deg;C</h1>`);
      res.write(`<h3>The condition is ${description}</h3>`);
      res.write(`<img src=${imageURL} />`);
      res.send();
    });
  });
});

// server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
