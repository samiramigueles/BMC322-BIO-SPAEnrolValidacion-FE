import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';

const GoogleAnalitycs = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        // Inicializar Google Analytics 4 con tu ID de medición
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
        // Manejar cambios de ruta para realizar un seguimiento de las vistas de página
        const handleRouteChange = (url) => {
            ReactGA.send({ hitType: "pageviw", path: url, title: url });
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default GoogleAnalitycs;