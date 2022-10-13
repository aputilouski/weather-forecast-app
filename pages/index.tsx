import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Alert, Spinner } from 'flowbite-react';
import { CurrentWeatherCard, WeatherForecastCard, useLayoutErrorManager } from '@components';
import { getLocationInfoByCoordinates, getCurrentWeatherWithThreeDayForecast } from '@api';
import useSWRImmutable from 'swr/immutable';
import clsx from 'clsx';
import { DEFAULT_LOCATIONS, DEFAULT_LOCATION_ID } from '@utils/globals';

const LOCATION_ID_KEY = 'location-id';

type PageContentProps = {
  locations: LocationInfo[];
  locationID?: number;
  setLocationID: (n: number) => void;
  userLocationID?: number;
};

const PageContent = ({ locations, locationID, setLocationID, userLocationID }: PageContentProps) => {
  const { setError } = useLayoutErrorManager();

  // here is a small optimization to avoid array lookup and show useMemo usage example
  const userLocation = React.useMemo(() => locations.find(l => l.id === userLocationID), [locations, userLocationID]);

  // useSWR helps cache results (important for limited api like here)
  const { data, error } = useSWRImmutable(`weather:${locationID}`, () => getCurrentWeatherWithThreeDayForecast(locationID || DEFAULT_LOCATION_ID));
  React.useEffect(() => {
    setError(error);
  }, [error, setError]);

  return (
    <div>
      <h1 className="mb-4 text-xl">Welcome to the weather forecast app</h1>

      {/* display a message with the user's geolocation */}
      <div className="mb-4">
        <Alert color={userLocation ? 'success' : 'failure'} withBorderAccent>
          {userLocation //
            ? `Your location: ${userLocation.name}, ${userLocation.country}`
            : 'Your location has not been determined'}
        </Alert>
      </div>

      {/* show default cities buttons */}
      <div className="mb-5">
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

      {/* show forecast for 3 days */}
      {data ? (
        <div className="mb-10">
          {userLocation && <CurrentWeatherCard location={userLocation} data={data.current} />}
          <div className="mt-3 flex gap-3">
            {data.forecast.map(data => (
              <WeatherForecastCard //
                key={data.date}
                data={data}
                className="flex-1"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-28">
          <Spinner />
        </div>
      )}

      {/* link to second page */}
      <div className="mb-20">
        <Link href={`/city/${locationID}`}>
          <a className="text-blue-600 hover:underline">Hourly weather and 10 day forecast</a>
        </Link>
      </div>
    </div>
  );
};

// here the page is split into two components to separate the logic from the location definition

const Page: NextPage = () => {
  // in react 17 I would use useReducer for the logic below
  const [locations, setLocations] = React.useState(DEFAULT_LOCATIONS);
  const startLocationUseIndicatorRef = React.useRef(false);
  const [locationID, setLocationID] = React.useState<number>();
  const [userLocationID, setUserLocationID] = React.useState<number>();

  // load locationID from localStorage
  React.useEffect(() => {
    if (typeof window === 'undefined') return setLocationID(DEFAULT_LOCATION_ID);
    const result = localStorage.getItem(LOCATION_ID_KEY);
    if (!result) return setLocationID(DEFAULT_LOCATION_ID);
    startLocationUseIndicatorRef.current = true;
    setLocationID(Number(result));
  }, []);

  // store locationID to localStorage
  React.useEffect(() => {
    if (!locationID) return;
    localStorage.setItem('location-id', locationID.toString());
  }, [locationID]);

  // custom hook to set global error message
  const { setError } = useLayoutErrorManager();

  // get user geolocation
  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      getLocationInfoByCoordinates(longitude, latitude) //
        .then(response => {
          const { id, name, country } = response;
          // react 18 batching
          setLocations(locations => (locations.find(l => l.id === id) ? locations : [{ id, name, country }, ...locations]));
          if (!startLocationUseIndicatorRef.current) setLocationID(id);
          setUserLocationID(id);
        })
        .catch(err => setError(err.message));
    });
  }, [setError]);

  return (
    <PageContent //
      locations={locations}
      locationID={locationID}
      setLocationID={setLocationID}
      userLocationID={userLocationID}
    />
  );
};

export default Page;
