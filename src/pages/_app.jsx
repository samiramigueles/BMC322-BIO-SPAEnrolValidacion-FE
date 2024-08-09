import Script from "next/script";
import { GlobalProvider } from "../Context";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../index.css";
import { ProviderError } from "@components/ProviderError";
import dynamic from "next/dynamic";

const GoogleAnalitycs = dynamic(() => import("@components/GoogleAnalitycs"), {
    ssr: false,
});

export default function MyApp({ Component, pageProps }) {
    return (
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <Script src="/Daon.FaceCapture.min.js" strategy="lazyOnload" />
                <Script
                    src="/Daon.DocumentCapture.min.js"
                    strategy="lazyOnload"
                />
                <ProviderError>
                    <GoogleAnalitycs>
                        <Component {...pageProps} />
                    </GoogleAnalitycs>
                </ProviderError>
            </ThemeProvider>
        </GlobalProvider>
    );
}
