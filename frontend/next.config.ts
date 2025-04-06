import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      'storage.googleapis.com',
      'example.com'
    ],
  },
};

export default nextConfig;
