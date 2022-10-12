import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Search, WeatherForecastCard } from '@components';
import { getCitiesByName, getTenDayForecast, WeatherForecast, getHourlyForecast } from '@api';
import Router from 'next/router';

type PageProps = {
  tenDayForecast: WeatherForecast[];
  hourlyForecast: WeatherForecast[];
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = Number(context.query.id);
  const result = await Promise.all([getTenDayForecast(id), getHourlyForecast(id)]).then(([{ forecast: tenDayForecast }, { forecast: hourlyForecast }]) => ({ tenDayForecast, hourlyForecast }));
  return {
    props: { ...result },
  };
};

const Page: NextPage<PageProps> = ({ tenDayForecast, hourlyForecast }) => {
  const loadItems = (text: string) => getCitiesByName(text).then(data => data.locations);
  const renderItem = (item: LocationInfo) => (
    <p onClick={() => Router.push(`/city/${item.id}`)} className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
      {item.name} <span className="text-gray-400">({item.country})</span>
    </p>
  );

  return (
    <div>
      <Head>
        <title>Datailed Weather</title>
      </Head>

      <Search loadItems={loadItems} renderItem={renderItem} />

      <div>
        <div className="mt-3 flex gap-3 flex-wrap">
          {tenDayForecast.map((data, index) => (
            <WeatherForecastCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
