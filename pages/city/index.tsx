import React from 'react';
import type { NextPage } from 'next';
import Router from 'next/router';
import { DEFAULT_LOCATION_ID } from '@utils/globals';

const Page: NextPage = () => {
  React.useEffect(() => {
    Router.replace(`/city/${DEFAULT_LOCATION_ID}`);
  }, []);
  return null;
};

export default Page;
