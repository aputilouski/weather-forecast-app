import { CurrentWeatherInfo } from '@api';
import { Card } from 'flowbite-react';

const CurrentWeatherCard = ({ data }: { data: CurrentWeatherInfo['current'] }) => {
  return (
    <Card>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </Card>
  );
};

export default CurrentWeatherCard;
