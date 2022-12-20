import { useState } from "react";

import WeatherCard, { Forecast } from "components/WeatherCard";
import Search from "components/Search";

type status = "idle" | "pending" | "resolved" | "rejected";

const Weather = () => {
  const [forecasts, setForecasts] = useState<Forecast[][]>([]);
  const [status, setStatus] = useState<status>("idle");
  const [message, setMessage] = useState<string>("");

  const handleResult = (data: Forecast[]) => {
    let groupForecastsByDays: Forecast[][] = [];
    for (let i = 0; i < 14; i += 2) {
      groupForecastsByDays.push([data[i], data[i + 1]]);
    }
    setForecasts(groupForecastsByDays);
  };

  const doSearch = async (address: string) => {
    setStatus("pending");
    const response = await fetch(
      `http://localhost:3003/forecast?address=${address}`
    );

    if (response.status === 500) {
      const data: { error: string } = await response.json();
      setMessage(`[${data.error}] Something went wrong...`);
      setStatus("rejected");
    } else {
      const data: Forecast[] = await response.json();
      handleResult(data as Forecast[]);
      setStatus("resolved");
    }
  };

  return (
    <div>
      <Search onEnter={doSearch} />
      <div>
        {status === "idle" && (
          <h1 className="text-center">
            Type an address to see the weather forecast for the next seven days
          </h1>
        )}
        {status === "pending" && <h1 className="text-center">loading...</h1>}
        {status === "resolved" &&
          forecasts.map((forecast: Forecast[]) => (
            <WeatherCard forecast={forecast} key={forecast[0].name} />
          ))}
        {status === "rejected" && <h1 className="text-center">{message}</h1>}
      </div>
    </div>
  );
};

export default Weather;
