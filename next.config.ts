import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["framerusercontent.com", "images.unsplash.com", "plus.unsplash.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //     pathname: "**",
    //     port: "**",
    //   },
    // ],
  },
};

export default nextConfig;
