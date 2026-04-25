import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        // pathname: "**",
        // port: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // pathname: "**",
        // port: "**",
      },
    ],
  },
};

export default nextConfig;
