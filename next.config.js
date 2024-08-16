const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontendNav: true,
    extendDefaultRuntimeCaching: true,
    disable: process.env.NODE_ENV !== 'production',
    workboxOptions: {
        runtimeCaching: [
            {
                urlPattern:
                    /^\/assets\/.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                handler: "NetworkFirst",
                options: {
                    cacheName: "static-image-assets",
                    expiration: {
                        maxEntries: 64,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    },
                    networkTimeoutSeconds: 10,
                },
            },
        ],
    },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withPWA(
    withBundleAnalyzer({
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "www.macro.com.ar",
                    pathname: "/imagen/**",
                },
            ],
        },
        webpack: (config, { isServer }) => {
            if (!isServer) {
                // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
                config.resolve.fallback = {
                    fs: false,
                };
            }

            return config;
        },
        compress: true,
        reactStrictMode: true,
        swcMinify: true,
    })
);
