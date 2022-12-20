import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const app = express();
const port = 3003;

app.use(cors());

const getCoordinates = async (address) => {
  if (!address) return null;
  console.log("Looking coordinates to ", address);

  const response = await fetch(
    `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=4&format=json`
  );
  const data = await response.json();
  console.log("GeoLocation fetching result: ", JSON.stringify(data));
  return data?.result?.addressMatches?.[0]?.coordinates || null;
};

const getForecastUrl = async (coordinates) => {
  if (!coordinates) return null;
  console.log(`Getting points to x: ${coordinates?.x}, y: ${coordinates?.y}`);

  const response = await fetch(
    `https://api.weather.gov/points/${coordinates.y},${coordinates.x}`
  );
  const data = await response.json();
  return data?.properties?.forecast || null;
};

const getForecast = async (address) => {
  const coordinates = await getCoordinates(address);

  if (!coordinates) return { error: "COORDINATE_FAIL" };

  const forecast = await getForecastUrl(coordinates);

  if (!forecast) return { error: "FORECAST_FAIL" };

  const res = await fetch(forecast);
  const data = await res.json();
  return data?.properties?.periods;
};

app.get("/forecast", async (req, res) => {
  const data = await getForecast(req.query.address);
  res.status(data?.error ? 500 : 200);
  res.send(data);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
