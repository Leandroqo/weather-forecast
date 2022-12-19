import { useState } from "react";

import WeatherCard, { Forecast } from "./components/WeatherCard";
import Search from "./components/Search";

import "./App.css";

type status = "idle" | "pending" | "resolved" | "rejected";

const Weather = () => {
  const [forecasts, setForecasts] = useState<Forecast[][]>([]);
  const [status, setStatus] = useState<status>("idle");

  const handleResult = (data: Forecast[]) => {
    let groupForecastsByDays: Forecast[][] = [];
    for (let i = 0; i < 14; i += 2) {
      groupForecastsByDays.push([data[i], data[i + 1]]);
    }
    setForecasts(groupForecastsByDays);
  };

  const doSearch = async (address: string) => {
    try {
      setStatus("pending");
      const response = await fetch(
        `http://localhost:3003/forecast?address=${address}`
      );
      const data: Forecast[] = await response.json();

      if (data) {
        handleResult(data);
        setStatus("resolved");
      }
    } catch (err) {
      setStatus("rejected");
    }
  };

  return (
    <div>
      <Search onEnter={doSearch} />
      <div>
        {status === "pending" && <span>loading...</span>}
        {status === "resolved" &&
          forecasts.map((forecast: Forecast[]) => (
            <WeatherCard forecast={forecast} />
          ))}
        {status === "rejected" && <span>Something went wrong...</span>}
      </div>
    </div>
  );
};

export default Weather;
