import "./style.css";
import image from "../../assets/images/MostlyClear.png";

const WeatherCard = () => {
  return (
    <div className="card day">
      <h2>Sunday</h2>
      <img src={image} width="100%" />
      <h4 className="text-center">Mostly cloud</h4>
      <div className="flex y20">
        <h3 className="f-large">22</h3>
        <h3>°F</h3>
      </div>
      <div className="flex space-arround">
        <div className="card-button radius align-center day">
          <img src={image} width="50" />
          <div>
            <span>22</span>
            <span>°F</span>
          </div>
        </div>
        <div className="card-button radius align-center night">
          <img src={image} width="50" />
          <div>
            <span>22</span>
            <span>°F</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
