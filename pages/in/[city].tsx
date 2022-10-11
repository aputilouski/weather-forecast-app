import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Search } from '@components';
import { getCitiesByName } from '@api';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async context => {
  // console.log(context.query);

  return {
    props: {}, // will be passed to the page component as props
  };
};

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Datailed Weather</title>
      </Head>

      <div>
        <Search //
          loadItems={text => getCitiesByName(text).then(data => data.locations)}
          renderItem={item => (
            <p onClick={() => Router.push('/in/' + item.name)} className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
              {item.name} <span className="text-gray-400">({item.country})</span>
            </p>
          )}
        />
      </div>

      <div>CONTENT</div>
    </div>
  );
};

export default Page;
