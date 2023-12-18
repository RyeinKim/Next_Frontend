import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Script from "next/script";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import {NextPage} from "next";

// 사용자 정의 속성을 포함하는 타입을 정의합니다.
type NextPageWithCustomProps = NextPage & {
    noLayout?: boolean;
};

// 사용자 정의 속성을 포함하는 컴포넌트의 타입을 지정합니다.
type AppPropsWithCustomProps = AppProps & {
    Component: NextPageWithCustomProps;
};

export default function App({ Component, pageProps }: AppPropsWithCustomProps) {
    const useLayout = !(Component.noLayout);

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
            {useLayout && <Header/>}
            {useLayout && <NavBar/>}
            <div className={`layoutContainer ${useLayout ? '' : 'no-layout'}`}>
                <Component {...pageProps} />
                {useLayout && <Aside/>}
            </div>
            {useLayout && <Footer/>}
        </>
    );
}
