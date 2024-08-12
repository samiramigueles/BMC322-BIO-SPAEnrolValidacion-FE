export let ReactGA;

export const inicializeGA = async () => {
    const module = await import("react-ga4");
    ReactGA = module.default;
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
};

export const trackEvent = (payload) => {
    ReactGA.event({
        ...payload,
    });
};
