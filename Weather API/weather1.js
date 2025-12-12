const express = require("express");
const router = express.Router();

const { Weather, validateWeather } = require("./weather");

// GET all weather records
router.get("/", async (req, res) => {
  const data = await Weather.find().sort("-lastupdate");
  res.send(data);
});

// POST new weather record
router.post("/", async (req, res) => {
  const { error } = validateWeather(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let weather = new Weather({
    country: req.body.country,
    city: req.body.city,
    coordinates: req.body.coordinates,
    humidity: req.body.humidity,
    current: req.body.current,
    lastupdate: req.body.lastupdate,
    forecast: req.body.forecast,
  });

  weather = await weather.save();
  res.send(weather);
});

// UPDATE weather record
router.put("/:id", async (req, res) => {
  let weather = await Weather.findById(req.params.id);
  if (!weather) return res.status(404).send("Weather record not found");

  weather.country = req.body.country || weather.country;
  weather.city = req.body.city || weather.city;
  weather.coordinates = req.body.coordinates || weather.coordinates;
  weather.humidity = req.body.humidity || weather.humidity;
  weather.current = req.body.current || weather.current;
  weather.lastupdate = req.body.lastupdate || weather.lastupdate;
  weather.forecast = req.body.forecast || weather.forecast;

  await weather.save();
  res.send(weather);
});

// DELETE weather record
router.delete("/:id", async (req, res) => {
  const weather = await Weather.findByIdAndDelete(req.params.id);
  if (!weather) return res.status(404).send("Weather record not found");

  res.send({ message: "Weather deleted" });
});

module.exports = router;
