const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const API_KEY = "YOUR_API_KEY";

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const parameters = req.body.queryResult.parameters;
  const city = parameters["geo-city"];
  const date = parameters["date"];
  const end_date = parameters["end-date"] ? parameters["end-date"] : date;

  try {
    // Get coordinates of city
    const locationResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );

    if (locationResponse.data.length === 0) {
      return res.json({ fulfillmentText: `I couldn't find ${city}.` });
    }

    const { lat, lon } = locationResponse.data[0];

    // Get weather data
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    );

    const weatherData = weatherResponse.data;
    let message = "";

    if (!date) {
      const current = weatherData.current;
      message = `Current weather in ${city}: ${current.weather[0].description}, temperature: ${current.temp}°C.`;
    } else {
      const startDate = new Date(date);
      const endDateObj = new Date(end_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startDiff = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
      const endDiff = Math.floor((endDateObj - today) / (1000 * 60 * 60 * 24));

      if (startDiff >= 0 && endDiff < 8 && startDiff <= endDiff) {
        let weatherInfo = "";

        for (let i = startDiff; i <= endDiff; i++) {
          const forecast = weatherData.daily[i];
          const forecastDate = new Date(today);
          forecastDate.setDate(today.getDate() + i);
          weatherInfo += `${forecastDate.toDateString()}: ${forecast.weather[0].description}, min: ${forecast.temp.min}°C, max: ${forecast.temp.max}°C. `;
        }

        if (startDate.getTime() === endDateObj.getTime()) {
          message = `The weather forecast for ${city} on ${startDate.toDateString()} is: ${weatherInfo.trim()}`;
        } else {
          message = `The forecasted weather from ${startDate.toDateString()} to ${endDateObj.toDateString()} for ${city} is: ${weatherInfo.trim()}`;
        }

      } else {
        message = `I can only provide forecasts for up to 8 days from today.`;
      }
    }

    return res.json({ fulfillmentText: message });
  } catch (error) {
    console.error(error);
    return res.json({ fulfillmentText: "Sorry, I had trouble getting the weather." });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
