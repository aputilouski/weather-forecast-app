import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Alert, Spinner } from 'flowbite-react';
import { CurrentWeatherCard, WeatherForecastCard } from '@components';
import { getLocationInfo, getCurrentWeatherWithThreeDayForecast } from '@api';
import useSWRImmutable from 'swr/immutable';

const Page: NextPage = () => {
  const [locations, setLocations] = React.useState([
    { id: 100625144, name: 'Minsk', country: 'Belarus' }, //
    { id: 100524901, name: 'Moscow', country: 'Russia' },
    { id: 103060972, name: 'Bratislava', country: 'Slovakia' },
  ]);

  const [locationID, setLocationID] = React.useState<number>(100625144);
  const [userLocationID, setUserLocationID] = React.useState<number>();
  const userLocation = React.useMemo(() => locations.find(l => l.id === userLocationID), [locations, userLocationID]);

  const [error, setError] = React.useState<string>();

  const { data, error: fetchError } = useSWRImmutable(`weather:${locationID}`, () => getCurrentWeatherWithThreeDayForecast(locationID));

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      getLocationInfo(longitude, latitude) //
        .then(response => {
          const { id, name, country } = response;
          setLocations(locations => (locations.find(l => l.id === id) ? locations : [{ id, name, country }, ...locations]));
          setUserLocationID(id);
        })
        .catch(err => {
          return console.error(err);
        });
    });
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl">Welcome to the weather forecast app</h1>

      <div className="mb-4">
        <Alert color={userLocation ? 'success' : 'error'}>{userLocation ? `Your location: ${userLocation.name}, ${userLocation.country}` : 'Your location has not been determined'}</Alert>
      </div>

      <div className="mb-4">
        <p className="mb-1">Most popular locations:</p>
        <div className="flex gap-3">
          {locations.map((location, i) => (
            <button //
              key={i}
              className="text-blue-600 hover:underline"
              onClick={() => setLocationID(location.id)}>
              {location.name}
            </button>
          ))}
        </div>
      </div>

      {error && <Alert color="red">{error}</Alert>}

      {data ? (
        <div className="mb-10">
          <CurrentWeatherCard data={data.current} />
          <div className="mt-3 flex gap-3">
            {data.forecast.map((data, index) => (
              <WeatherForecastCard key={index} data={data} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-28">
          <Spinner />
        </div>
      )}

      <div className="mb-20">
        <Link href="/in">
          <a className="text-blue-600 hover:underline">Hourly weather and 10 day forecast</a>
        </Link>
      </div>
    </div>
  );
};

export default Page;
