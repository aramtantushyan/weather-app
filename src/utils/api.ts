export const fetchLocationLatLng = (city: string, limit?: number) => `/geo/1.0/direct?q=${city}${limit ? `&limit=${limit}` : ''}&appid=${process.env.REACT_APP_API_KEY}`;

export const fetchCityByLatLng = (lat: number, lng: number) => `/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;

export const fetchCurrentWeather = (city: string, units: 'imperial' | 'metric') => `/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

export const fetchHourlyForecast = (city: string, units: 'imperial' | 'metric', cnt: number) => `/data/2.5/forecast/hourly?q=${city}&units=${units}&cnt=${cnt}&appid=${process.env.REACT_APP_API_KEY}`;

export const fetchFiveDaysForecast = (city: string, units: 'imperial' | 'metric') => `/data/2.5/forecast?q=${city}&units=${units}&cnt=${40}&appid=${process.env.REACT_APP_API_KEY}`;

// const getFiveDaysWeatherForecast = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// const getHourlyForecase = https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}