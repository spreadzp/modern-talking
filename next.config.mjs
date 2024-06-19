/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        config.resolve.mainFields = ['browser', 'main', 'module']
        return config
    }
};

export default nextConfig;
