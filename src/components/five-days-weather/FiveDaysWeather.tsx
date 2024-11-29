import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContextProvider";

const FiveDaysWeather: React.FC = () => {
  const { fiveDaysForecast } = useContext(WeatherContext);

  const dayClickHandler = () => {

  }

  return (
    <div className="fiveDaysForecast">
      {Object.values(fiveDaysForecast || {}).map((d, i) => (
        <div key={i} className="fiveDaysForecastItem" onClick={dayClickHandler}>
          <span>{d.day}</span>
          <span>{d.temp}</span>
          <span>{d.condition}</span>
        </div>
      ))}
    </div>
  );
};
export default FiveDaysWeather;
