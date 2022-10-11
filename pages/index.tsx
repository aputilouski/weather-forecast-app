import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Alert } from 'flowbite-react';
import { getLocationInfo } from '@api';

const baseLocations = [
  { label: 'Minsk' }, //
  { label: 'Moscow' },
  { label: 'Bratislava' },
];

const Page: NextPage = () => {
  const [location, setLocation] = React.useState<any>();

  const [error, setError] = React.useState<string>();

  // React.useEffect(() => {
  //   if (!navigator.geolocation) return;
  //   navigator.geolocation.getCurrentPosition(function (pos) {
  //     const { latitude, longitude } = pos.coords;
  //     console.log(pos.coords);
  //     getLocationInfo(longitude, latitude) //
  //       .then(response => console.log(response))
  //       .catch(err => console.error(err));
  //   });
  // }, []);

  return (
    <div>
      {error && <Alert color="red">{error}</Alert>}

      <h1 className="my-4">Welcome to the weather forecast app</h1>

      <div className="mb-4">
        <p>Most popular locations:</p>
        <div className="flex gap-3">
          {baseLocations.map((l, i) => (
            <button key={i} className="text-blue-600 hover:underline">
              Minsk
            </button>
          ))}
        </div>
      </div>

      <div>
        <Link href="/in">
          <a className="text-blue-600 hover:underline">Hourly weather and 10 day forecast</a>
        </Link>
      </div>
    </div>
  );
};

export default Page;
