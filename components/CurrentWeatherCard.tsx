import WeatherIcon from './WeatherIcon';
import moment from 'moment';
import clsx from 'clsx';
import DegreesCelciusIcon from '../public/icons/degrees-celcius.svg';

type CurrentWeatherCardProps = {
  data: CurrentForecast;
  className?: string;
  location: LocationInfo;
};

const CurrentWeatherCard = ({ data, className, location }: CurrentWeatherCardProps) => (
  <div className={clsx('shadow-lg rounded px-5 py-8 flex', className)}>
    <div className="flex-1 flex flex-col gap-2 items-center">
      <h4 className="text-xl text-center">
        {location.name}, <span className="text-gray-400">{location.country}</span>
      </h4>
      <p className="text-sm">Current time: {moment(data.time).format('HH:mm')}</p>

      <WeatherIcon symbol={data.symbol} className="w-24" />

      <div className="text-center">
        <p className="text-xl mb-1">
          <span className="align-middle">{data.temperature}</span>
          <DegreesCelciusIcon className="inline-block ml-2 w-5" />
        </p>
        <p className="text-sm tracking-tight text-gray-500">
          <span className="align-middle">feels like {data.feelsLikeTemp}</span>
          <DegreesCelciusIcon className="inline-block ml-2 w-3" />
        </p>
      </div>
    </div>

    <div className="flex-1 flex flex-col gap-2.5 items-start text-sm tracking-tight">
      <p>
        Wind: {data.windSpeed} m/s, {data.windDirString}, max: {data.windGust} m/s
      </p>
      <p>Humidity: {data.relHumidity} %</p>
      <p>Precipitation probability: {data.precipProb} %</p>
      <p>Cloudiness: {data.cloudiness} %</p>
      <p>Thunder probability: {data.thunderProb} %</p>
      <p>Ultraviolet index: {data.uvIndex}</p>
      <p>Pressure: {data.pressure} hPa</p>
      <p>Visibility: {data.visibility} m</p>
    </div>
  </div>
);

export default CurrentWeatherCard;
