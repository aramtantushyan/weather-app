import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { getCity } from "../utils/location.helper";
import { filterTodaysHours, getCurrentWeather, getFiveDaysWeatherForecast, getHourlWeather, groupForecastDataByDay } from "../utils/weather.helper";

interface ICurrentWeather {
  city: string;
  temp: number;
  condition: string;
}

export interface IFiveDaysWeather {
  day: string;
  temp: number;
  condition: string;
}

export interface IHourlWeather {
  hour: string;
  temp: number;
  condition: string;
}

interface IWeatherContext {
  isCelsius?: boolean;
  setIsCelsius?: Dispatch<SetStateAction<boolean>>;
  currentWeather?: ICurrentWeather;
  hourlyWeather?: IHourlWeather[];
  fiveDaysForecast?: {[key: string]: IFiveDaysWeather}
}

export const WeatherContext = createContext<IWeatherContext>({});
export const WeatherContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState('Yerevan');
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
  const [hourlyWeather, setHourlyWeather] = useState<IHourlWeather[]>([]);
  const [fiveDaysForecast, setFiveDaysForecast] = useState<{[key: string]: IFiveDaysWeather}>({});

  useEffect(() => {
    getCity((city) => {
      city && setCity(city);
    });
    
  }, [])

  useEffect(() => {
    if (city) {
      (async () => {
        const weather = await getCurrentWeather(city, isCelsius ? 'metric' : 'imperial');
        setCurrentWeather({
          city: weather.name,
          condition: weather.weather[0].main,
          temp: Math.floor(weather.main.temp)
        });
        const fiveDaysForecast = await getFiveDaysWeatherForecast(city, isCelsius ? 'metric' : 'imperial');
        const todayHourly: IHourlWeather[] = filterTodaysHours(fiveDaysForecast.list);
        setHourlyWeather(todayHourly);
        const fiveDaysWeather = groupForecastDataByDay(fiveDaysForecast.list);
        setFiveDaysForecast(fiveDaysWeather);
      })()
    }
  }, [city, isCelsius]);

  return (
    <WeatherContext.Provider value={{
      isCelsius,
      setIsCelsius,
      currentWeather,
      hourlyWeather,
      fiveDaysForecast
    }}>
      {children}
    </WeatherContext.Provider>
  )
} 