import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Search from "./components/Search";

const Weather = () => {
  return (
    <div>
      <Search />
      <div className="flex space-arround">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </div>
  );
};

export default Weather;
