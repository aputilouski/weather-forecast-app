export {};

declare global {
  type LocationInfo = {
    id: number;
    name: string;
    country: string;
  };

  type WeatherForecast = {
    date: string;
    maxTemp: number;
    minTemp: number;
    maxWindSpeed: number;
    precipAccum: number;
    windDir: number;
    symbol: WeatherIconType;
  };

  type HourlyForecast = {
    time: string;
    symbol: WeatherIconType;
    temperature: number;
    feelsLikeTemp: number;
    precipAccum: number;
    precipProb: number;
    windDirString: string;
    windGust: number;
    windSpeed: number;
  };

  type CurrentForecast = {
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
    symbol: WeatherIconType;
  };
}
