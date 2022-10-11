const API_HEADERS = {
  'X-RapidAPI-Key': '79c2f76d39mshde3bde9f03e6668p10c3f3jsne47601d5ea49',
  'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
};

export const getCitiesByName = (name: string): Promise<LocationInfo[]> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/search/${name}?lang=en`, //
    { method: 'GET', headers: API_HEADERS }
  )
    .then(response => response.json())
    .then(data => data.locations);

export const getLocationInfo = (longitude: number, latitude: number): Promise<LocationInfo> =>
  fetch(
    `https://foreca-weather.p.rapidapi.com/location/${longitude},${latitude}`, //
    { method: 'GET', headers: API_HEADERS }
  ).then(response => response.json());

export const currentWeatherWithThreeDayForecast = () => {};
