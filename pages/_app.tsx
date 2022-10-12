import '../globals.css';
import type { AppProps } from 'next/app';
import { Layout, ProvideLayoutErrorManager } from '@components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideLayoutErrorManager>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideLayoutErrorManager>
  );
}

export default MyApp;
