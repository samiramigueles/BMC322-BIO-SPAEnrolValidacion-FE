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
                <ProviderError>
                    <GoogleAnalitycs>
                        <Component {...pageProps} />
                    </GoogleAnalitycs>
                </ProviderError>
            </ThemeProvider>
        </GlobalProvider>
    );
}
