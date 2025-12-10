import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: "./tsconfig.json"
  }
};

export default nextConfig;
