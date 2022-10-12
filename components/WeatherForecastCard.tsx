import { WeatherForecast } from '@api';
import { Card } from 'flowbite-react';
import WeatherIcon from './WeatherIcon';
import moment from 'moment';
import DegreesCelciusIcon from '../public/icons/degrees-celcius.svg';
import { degToCompass } from '@utils/helhers';

const WeatherForecastCard = ({ data }: { data: WeatherForecast }) => (
  <div className="flex flex-col shadow-lg rounded px-5 py-8 gap-2 items-center">
    <p className="mb-1">{moment(data.date).format('dddd DD MMM')}</p>
    <p className="text-xl">
      <span className="align-middle">
        {data.maxTemp}/{data.minTemp}
      </span>
      <DegreesCelciusIcon className="inline-block ml-2 w-5" />
    </p>
    <WeatherIcon symbol={data.symbol} className="w-24 my-3" />
    <p className="text-sm">
      Wind: {data.maxWindSpeed} m/s, {degToCompass(data.windDir)}
    </p>
    <p className="text-sm">PrecipAccum: {data.precipAccum}</p>
  </div>
);

export default WeatherForecastCard;
