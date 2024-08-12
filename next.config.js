const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    async headers() {
        return [
            {
                source: "/Daon.FaceCapture.min.js",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "max-age=31536000, immutable", // Cachear durante 1 año
                    },
                ],
            },
            {
                source: "/Daon.DocumentCapture.min.js",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "max-age=31536000, immutable", // Cachear durante 1 año
                    },
                ],
            },
        ];
    },
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
