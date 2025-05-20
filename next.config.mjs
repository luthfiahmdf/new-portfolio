// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['i.scdn.co'],
//   }
// };
//
// export default nextConfig;
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co']
  }
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
