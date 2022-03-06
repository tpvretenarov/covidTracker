import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
