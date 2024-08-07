import Script from "next/script";
import { GlobalProvider } from "../Context";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../index.css";
import GoogleAnalitycs from "@components/GoogleAnalitycs";
import { ProviderError } from "@components/ProviderError";

export default function MyApp({ Component, pageProps }) {

    return (
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <Script src="/Daon.FaceCapture.min.js" />
                <Script src="/Daon.DocumentCapture.min.js" />
                <ProviderError>
                    <GoogleAnalitycs>
                        <Component {...pageProps} />
                    </GoogleAnalitycs>
                </ProviderError>
            </ThemeProvider>
        </GlobalProvider>
    );
}
