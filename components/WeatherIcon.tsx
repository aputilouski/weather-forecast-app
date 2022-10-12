import { weatherIcons, WeatherIconType } from '@utils/weather-icon';

type WeatherIconProps = {
  className?: string;
  symbol: WeatherIconType;
};

const WeatherIcon = ({ className, symbol }: WeatherIconProps) => {
  const Icon = weatherIcons[symbol] || weatherIcons.d000;
  return <Icon className={className} />;
};

export default WeatherIcon;
