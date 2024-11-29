import { IHourlWeather } from "../contexts/WeatherContextProvider";
import { fetchCurrentWeather, fetchFiveDaysForecast, fetchHourlyForecast } from "./api";

export const getCurrentWeather = async (city: string, units: 'imperial' | 'metric') => {
  try {
    const response = await fetch(fetchCurrentWeather(city, units), {
      headers: {
        'Content-type': 'application/json'
      }
    });
    const weather = await response.json();
    return weather;
  } catch (e) {
    throw new Error('Failed to get current weather');
  }
}

export const getHourlWeather = async (city: string, units: 'imperial' | 'metric') => {
  try {
    const d = new Date();
    const hours = d.getHours();
    console.log('hours', hours);
    const response = await fetch(fetchHourlyForecast(city, units, 4), {
      headers: {
        'Content-type': 'application/json'
      }
    });
    const hourlyWeather = await response.json();
    return hourlyWeather;
  } catch (e) {
    throw new Error('Failed to get hourly weather');
  }
}

export const getFiveDaysWeatherForecast = async (city: string, units: 'imperial' | 'metric') => {
  try {
    const response = await fetch(fetchFiveDaysForecast(city, units), {
      headers: {
        'Content-type': 'application/json'
      }
    });
    const fiveDaysForecast = await response.json();
    return fiveDaysForecast;
    console.log('weather', fiveDaysForecast);
  } catch (e) {
    throw new Error('Failed to get hourly weather');
  }
}

export const filterTodaysHours = (list: []) => {
  const todayHours = list.filter((d: any) => {
    const today = new Date();
    const date = new Date(d.dt_txt);
    if (
      date.getDate() === today.getDate() 
        && today.getMonth() === date.getMonth()
        && today.getFullYear() === date.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  });
  return todayHours.map((h: any) => ({
    hour: h.dt_txt.split(' ')[1] as string,
    condition: h.weather[0].main as string,
    temp: Math.floor(h.main.temp) as number
  }))
}

export const groupForecastDataByDay = (list: any[]) => {
  const forecastByDays: {[key: string]: any} = {};
  if (list?.length) {
    list?.forEach(h => {
      const day = h.dt_txt.split(' ')[0];
      if (!(day in forecastByDays)) {
        forecastByDays[day] = {
          day,
          temp: Math.floor(h.main.temp),
          condition: h.weather[0].main
        }
      }
    });
  }
  return forecastByDays;
}