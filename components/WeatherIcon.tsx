import { weatherIcons, WeatherIconType } from '@utils/weather-icon';

type WeatherIconProps = {
  className?: string;
  symbol: WeatherIconType;
};

// this component uses the symbol field to select the desired icon
const WeatherIcon = ({ className, symbol }: WeatherIconProps) => {
  const Icon = weatherIcons[symbol] || weatherIcons.d000;
  return <Icon className={className} />;
};

export default WeatherIcon;
