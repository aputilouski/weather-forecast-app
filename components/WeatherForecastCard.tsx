import { WeatherForecast } from '@api';
import { Card } from 'flowbite-react';

const WeatherForecastCard = ({ data }: { data: WeatherForecast }) => {
  return (
    <Card>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </Card>
  );
};

export default WeatherForecastCard;
