import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Script from "next/script";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <meta charSet="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Head>
            <Script
              strategy="beforeInteractive"
              src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"
            />
          <Header />
        <Component {...pageProps} />
      </>
  );
}
