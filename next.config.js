/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://v5.airtableusercontent.com'],
  },
}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        port: '',
        pathname: '/v1/15/15/1680451200000/**',
      },
    ],
  },
}

module.exports = nextConfig
