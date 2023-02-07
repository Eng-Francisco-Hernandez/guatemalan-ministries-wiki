/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
        basePath: false,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
