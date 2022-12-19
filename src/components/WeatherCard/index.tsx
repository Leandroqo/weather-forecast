import "./style.css";

export type Forecast = {
  name: string;
  icon: string;
  shortForecast: string;
  temperature: number;
  temperatureUnit: string;
};

type WeatherCardProps = {
  forecast: Forecast[];
};

const WeatherCard = ({ forecast }: WeatherCardProps) => {
  return (
    <div className="card">
      <div className="flex">
        <div className="flex card-item">
          <img src={forecast[0].icon} className="card-image" />
          <div>
            <h1>{forecast[0].name}</h1>
            <h3 className="card-shortForecast">{forecast[0].shortForecast}</h3>
            <h2>
              {forecast[0].temperature} º{forecast[0].temperatureUnit}
            </h2>
          </div>
        </div>
        <div className="flex card-item">
          <img src={forecast[1].icon} className="card-image" />
          <div>
            <h1>{forecast[1].name}</h1>
            <h3 className="card-shortForecast">{forecast[1].shortForecast}</h3>
            <h2>
              {forecast[1].temperature} º{forecast[1].temperatureUnit}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
