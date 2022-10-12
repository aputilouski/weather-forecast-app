// https://developer.foreca.com/

const API_HEADERS = {
  'X-RapidAPI-Key': '8c94197dd4mshce3e7442a8f56b3p1751eejsne924517a4c3d',
  'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
};

export const getCitiesByName = (name: string): Promise<{ locations: LocationInfo[] }> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/search/${name}?lang=en`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export type CurrentWeatherInfo = {
  current: CurrentForecast;
};

export const getCurrentWeather = (id: number): Promise<CurrentWeatherInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/current/${id}?alt=0&tempunit=C&windunit=MS`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export type WeatherForecastInfo = {
  forecast: WeatherForecast[];
};

export const getThreeDayForecast = (id: number): Promise<WeatherForecastInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=3`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getCurrentWeatherWithThreeDayForecast = (id: number): Promise<CurrentWeatherInfo & WeatherForecastInfo> => Promise.all([getCurrentWeather(id), getThreeDayForecast(id)]).then(([currentData, forecastData]) => ({ current: currentData.current, forecast: forecastData.forecast }));

export const getLocationInfoByCoordinates = (longitude: number, latitude: number): Promise<LocationInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/${longitude},${latitude}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getLocationInfo = (id: number): Promise<LocationInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/${id}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getTenDayForecast = (id: number): Promise<WeatherForecastInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=10`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const getHourlyForecast = (id: number, history: boolean = false): Promise<{ forecast: HourlyForecast[] }> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/forecast/hourly/${id}?alt=0&tempunit=C&windunit=MS&periods=12${history && '&history=1'}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());
