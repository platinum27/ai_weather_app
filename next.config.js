/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['www.weatherbit.io'],
  },
  experimental: { appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
   },
}

module.exports = nextConfig
