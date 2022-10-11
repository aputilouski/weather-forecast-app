const API_HEADERS = {
  'X-RapidAPI-Key': '79c2f76d39mshde3bde9f03e6668p10c3f3jsne47601d5ea49',
  'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
};

export const getUserLocation = <T>(longitude: number, latitude: number): Promise<UserLocation> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/${longitude},${latitude}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const currentWeatherWithThreeDayForecast = () => {};
