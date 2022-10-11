import { WeatherForecastInfo } from '@api';
import { Card } from 'flowbite-react';

const WeatherForecastCard = ({ data }: { data: WeatherForecastInfo['forecast'][number] }) => {
  return (
    <Card>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </Card>
  );
};

export default WeatherForecastCard;
