/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
        // Disable error overlay in development mode
        if (dev) {
          config.devServer = {
            overlay: {
              warnings: false,
              errors: false,
            },
          };
        }
        return config;
      },
};

export default nextConfig;
