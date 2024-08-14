import { GlobalProvider } from "../Context";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../index.css";
import { ProviderError } from "@components/ProviderError";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";

const GoogleAnalitycs = dynamic(() => import("@components/GoogleAnalitycs"), {
    ssr: false,
});

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <title>Banco Chat</title>
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="eMe chat" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="mask-icon"
                    href="/icons/mask-icon.svg"
                    color="#FFFFFF"
                />
                <meta name="theme-color" content="#ffffff" />
                <link
                    rel="apple-touch-icon"
                    href="/icons/touch-icon-iphone.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/touch-icon-ipad.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/touch-icon-iphone-retina.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="/icons/touch-icon-ipad-retina.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://yourdomain.com" />
                <meta name="twitter:title" content="My awesome PWA app" />
                <meta
                    name="twitter:description"
                    content="Best PWA app in the world!"
                />
                <meta name="twitter:image" content="/icons/twitter.png" />
                <meta name="twitter:creator" content="@DavidWShadow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="My awesome PWA app" />
                <meta
                    property="og:description"
                    content="Best PWA app in the world!"
                />
                <meta property="og:site_name" content="My awesome PWA app" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta property="og:image" content="/icons/og.png" />
                {/* add the following only if you want to add a startup image for Apple devices. */}
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_2048.png"
                    sizes="2048x2732"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_1668.png"
                    sizes="1668x2224"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_1536.png"
                    sizes="1536x2048"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_1125.png"
                    sizes="1125x2436"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_1242.png"
                    sizes="1242x2208"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_750.png"
                    sizes="750x1334"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/images/apple_splash_640.png"
                    sizes="640x1136"
                />
            </Head>
            <GlobalProvider>
                <Script
                    src="/Daon.FaceCapture.min.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="/Daon.DocumentCapture.min.js"
                    strategy="lazyOnload"
                />
                <ThemeProvider theme={theme}>
                    <ProviderError>
                        <GoogleAnalitycs>
                            <Component {...pageProps} />
                        </GoogleAnalitycs>
                    </ProviderError>
                </ThemeProvider>
            </GlobalProvider>
        </>
    );
}
