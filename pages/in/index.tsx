import React from 'react';
import type { NextPage } from 'next';
import Router from 'next/router';

const Page: NextPage = () => {
  React.useEffect(() => {
    Router.replace('/in/Minsk');
  }, []);
  return null;
};

export default Page;
