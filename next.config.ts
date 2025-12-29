import type { NextConfig } from "next";
const { resolve } = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "oss-cf.cjdropshipping.com", 
      },
      {
        protocol: "https",
        hostname: "cf.cjdropshipping.com", 
      },
      {
        protocol: "http",
        hostname: "192.168.0.106"
      },
       {
        protocol: "http",
        hostname: "http://127.0.0.1"
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'www.admin.lookmartbd.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  reactStrictMode: false,
   webpack: (config) => {
     config.resolve.alias = {
       ...config.resolve.alias,
       '@': resolve(__dirname, 'src'),
     };
     return config;
   },
};


export default nextConfig;
