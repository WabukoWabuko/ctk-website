import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
