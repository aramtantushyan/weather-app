import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContextProvider";

const HourlyWeather: React.FC = () => {
  const { hourlyWeather, isCelsius } = useContext(WeatherContext);
    return (
      <div className="hourlyWeather">
        {hourlyWeather?.map(h => (
          <div className="hourlyWeatherItem">
            <span>{h.hour}</span>
            <span>{h.temp} {isCelsius ? 'C' : 'F'}</span>
            <span>{h.condition}</span>
          </div>
        ))}
      </div>
    );
};
export default HourlyWeather;
