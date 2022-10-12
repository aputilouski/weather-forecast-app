import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Search, WeatherForecastCard, HourlyForecast } from '@components';
import { getCitiesByName, getTenDayForecast, getLocationInfo, getHourlyForecast } from '@api';
import Router from 'next/router';
import { Spinner } from 'flowbite-react';

type PageProps = {
  location: LocationInfo;
  tenDayForecast: WeatherForecast[];
  hourlyForecast: HourlyForecast[];
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = Number(context.query.id);
  const result = await Promise.all([
    getLocationInfo(id), //
    getTenDayForecast(id),
    getHourlyForecast(id),
  ]).then(([location, { forecast: tenDayForecast }, { forecast: hourlyForecast }]) => ({ location, tenDayForecast, hourlyForecast }));
  return {
    props: { ...result },
  };
};

const Page: NextPage<PageProps> = ({ location, tenDayForecast, hourlyForecast }) => {
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

      <div className="mb-8">
        <Search loadItems={loadItems} renderItem={renderItem} />
      </div>

      <h1 className="text-3xl text-center font-semibold mt-24 mb-16">
        Weather in {location.name}, {location.country}
      </h1>

      <hr className="mb-12 h-px bg-gray-200 border-0" />

      <h4 className="text-xl font-semibold mb-5 text-center">Hourly forecast:</h4>

      <HourlyForecast className="mx-auto mb-10" data={hourlyForecast} />

      <hr className="mb-12 h-px bg-gray-200 border-0" />

      <h4 className="text-xl font-semibold mb-5 text-center">10 day forecast:</h4>

      <div className="mb-20 grid grid-cols-5 gap-3">
        {tenDayForecast.map(data => (
          <WeatherForecastCard //
            key={data.date}
            data={data}
            iconSize="sm"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
