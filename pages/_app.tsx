import '../globals.css';
import type { AppProps } from 'next/app';
import { Layout, ProvideLayoutErrorManager, ErrorBoundary } from '@components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideLayoutErrorManager>
      <Layout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </ProvideLayoutErrorManager>
  );
}

export default MyApp;
