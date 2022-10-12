import WeatherIcon from './WeatherIcon';
import moment from 'moment';
import DegreesCelciusIcon from '../public/icons/degrees-celcius.svg';
import { degToCompass } from '@utils/helhers';
import clsx from 'clsx';

type WeatherForecastCardProps = {
  data: WeatherForecast;
  className?: string;
  iconSize?: 'sm' | 'md';
};

const WeatherForecastCard = ({ data, className, iconSize = 'md' }: WeatherForecastCardProps) => (
  <div className={clsx('flex flex-col shadow-lg rounded px-5 py-8 gap-2 items-center', className)}>
    <p className="mb-1">{moment(data.date).format('dddd DD MMM')}</p>
    <p className="text-xl">
      <span className="align-middle">
        {data.maxTemp}/{data.minTemp}
      </span>
      <DegreesCelciusIcon className="inline-block ml-2 w-5" />
    </p>
    <WeatherIcon symbol={data.symbol} className={clsx('my-3', iconSize === 'md' ? 'w-24' : 'w-16')} />
    <p className="text-sm tracking-tight">
      Wind: {data.maxWindSpeed} m/s, {degToCompass(data.windDir)}
    </p>
    <p className="text-sm tracking-tight">Precipitation: {data.precipAccum} mm/h</p>
  </div>
);

export default WeatherForecastCard;
