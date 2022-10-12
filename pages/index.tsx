import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Alert, Spinner } from 'flowbite-react';
import { CurrentWeatherCard, WeatherForecastCard, useLayoutErrorManager } from '@components';
import { getLocationInfo, getCurrentWeatherWithThreeDayForecast } from '@api';
import useSWRImmutable from 'swr/immutable';
import clsx from 'clsx';

const DEFAULT_LOCATIONS = [
  { id: 100625144, name: 'Minsk', country: 'Belarus' }, //
  { id: 100524901, name: 'Moscow', country: 'Russia' },
  { id: 103060972, name: 'Bratislava', country: 'Slovakia' },
];
const LOCATION_ID_KEY = 'location-id';
const DEFAULT_LOCATION_ID = 100625144;

const Page: NextPage = () => {
  const [locations, setLocations] = React.useState(DEFAULT_LOCATIONS);

  const startLocationUseIndicatorRef = React.useRef(false);

  const [locationID, setLocationID] = React.useState<number>();

  React.useEffect(() => {
    if (typeof window === 'undefined') return setLocationID(DEFAULT_LOCATION_ID);
    const result = localStorage.getItem(LOCATION_ID_KEY);
    if (!result) return setLocationID(DEFAULT_LOCATION_ID);
    startLocationUseIndicatorRef.current = true;
    setLocationID(Number(result));
  }, []);

  React.useEffect(() => {
    if (!locationID) return;
    localStorage.setItem('location-id', locationID.toString());
  }, [locationID]);

  const [userLocationID, setUserLocationID] = React.useState<number>();
  const userLocation = React.useMemo(() => locations.find(l => l.id === userLocationID), [locations, userLocationID]);

  const { setError } = useLayoutErrorManager();

  const { data, error } = useSWRImmutable(`weather:${locationID}`, () => getCurrentWeatherWithThreeDayForecast(locationID || DEFAULT_LOCATION_ID));
  React.useEffect(() => {
    setError(error);
  }, [error, setError]);

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      getLocationInfo(longitude, latitude) //
        .then(response => {
          const { id, name, country } = response;
          setLocations(locations => (locations.find(l => l.id === id) ? locations : [{ id, name, country }, ...locations]));
          if (!startLocationUseIndicatorRef.current) setLocationID(id);
          setUserLocationID(id);
        })
        .catch(err => setError(err.message));
    });
  }, [setError]);

  return (
    <div>
      <h1 className="mb-4 text-xl">Welcome to the weather forecast app</h1>

      <div className="mb-4">
        <Alert color={userLocation ? 'success' : 'failure'} withBorderAccent>
          {userLocation //
            ? `Your location: ${userLocation.name}, ${userLocation.country}`
            : 'Your location has not been determined'}
        </Alert>
      </div>

      <div className="mb-4">
        <p className="mb-1">Most popular locations:</p>
        <div className="flex gap-3">
          {locations.map(location => (
            <button //
              key={location.id}
              className={clsx('hover:underline', locationID === location.id ? 'text-blue-900' : 'text-blue-600')}
              onClick={() => setLocationID(location.id)}>
              {location.name}
            </button>
          ))}
        </div>
      </div>

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
