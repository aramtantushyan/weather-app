import React from 'react';
import { WeatherContextProvider } from "./contexts/WeatherContextProvider";
import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import HourlyWeather from "./components/hourly-weather/HourlyWeather";
import FiveDaysWeather from "./components/five-days-weather/FiveDaysWeather";
import styles from "./index.module.scss";

function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    // doSomething(position.coords.latitude, position.coords.longitude);
  });
  
  return (
    <WeatherContextProvider>
      <div className={styles.root}>
        <Header />
        <main className="main">
          <CurrentWeather />
          <HourlyWeather />
        </main>
        <FiveDaysWeather />
      </div>
    </WeatherContextProvider>
  );
}

export default App;
