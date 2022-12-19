import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const app = express();
const port = 3003;

app.use(cors());

const getCoordinates = async (address) => {
  if (!address) return null;

  const response = await fetch(
    `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=4&format=json`
  );
  const data = await response.json();
  return data?.result?.addressMatches?.[0]?.coordinates || null;
};

const getForecastUrl = async (coordinates) => {
  if (!coordinates) return null;

  const response = await fetch(
    `https://api.weather.gov/points/${coordinates.y},${coordinates.x}`
  );
  const data = await response.json();
  return data?.properties?.forecast || null;
};

const getForecast = async (address) => {
  const coordinates = await getCoordinates(address);
  const forecast = await getForecastUrl(coordinates);
  const res = await fetch(forecast);
  const data = await res.json();
  return data?.properties?.periods;
};

app.get("/forecast", async (req, res) => {
  const data = await getForecast(req.query.address);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
