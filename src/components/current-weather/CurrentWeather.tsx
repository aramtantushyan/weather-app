import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContextProvider";

const CurrentWeather: React.FC = () => {
  const { currentWeather, isCelsius } = useContext(WeatherContext);

    return (
      <div className="currentWeather">
        <p>{currentWeather?.city}</p>
        <p>{currentWeather?.temp} {isCelsius ? 'C' : 'F'}</p>
        <p>{currentWeather?.condition}</p>
      </div>
    );
};
export default CurrentWeather;
