// https://developer.foreca.com/

const API_HEADERS = {
  'X-RapidAPI-Key': '79c2f76d39mshde3bde9f03e6668p10c3f3jsne47601d5ea49',
  'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
};

export const getCitiesByName = (name: string): Promise<{ locations: LocationInfo[] }> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/search/${name}?lang=en`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export type CurrentWeatherInfo = {
  current: {
    time: string;
    temperature: number;
    feelsLikeTemp: number;
    relHumidity: number;
    dewPoint: number;
    windSpeed: number;
    windDir: number;
    windDirString: string;
    windGust: number;
    precipProb: number;
    precipRate: number;
    cloudiness: number;
    thunderProb: number;
    uvIndex: number;
    pressure: number;
    visibility: number;
  };
};

export const getCurrentWeather = (id: number): Promise<CurrentWeatherInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/current/${id}?alt=0&tempunit=C&windunit=MS`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export type WeatherForecast = {
  date: string;
  maxTemp: number;
  minTemp: number;
  maxWindSpeed: number;
  precipAccum: number;
  windDir: number;
  symbol: string;
};

export type WeatherForecastInfo = {
  forecast: WeatherForecast[];
};

export const getThreeDayForecast = (id: number): Promise<WeatherForecastInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=3`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getCurrentWeatherWithThreeDayForecast = (id: number): Promise<CurrentWeatherInfo & WeatherForecastInfo> => Promise.all([getCurrentWeather(id), getThreeDayForecast(id)]).then(([currentData, forecastData]) => ({ current: currentData.current, forecast: forecastData.forecast }));

export const getLocationInfo = (longitude: number, latitude: number): Promise<LocationInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/${longitude},${latitude}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getTenDayForecast = (id: number): Promise<WeatherForecastInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=10`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getHourlyForecast = (id: number): Promise<WeatherForecastInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/hourly/${id}?alt=0&tempunit=C&windunit=MS&periods=12&history=1`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());
