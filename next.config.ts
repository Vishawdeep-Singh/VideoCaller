import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains: ['cdn.prod.website-files.com']
  },
  turboMode: false,
  /* config options here */
};

export default nextConfig;
