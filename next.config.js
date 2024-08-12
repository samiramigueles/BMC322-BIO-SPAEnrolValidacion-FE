const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
});
