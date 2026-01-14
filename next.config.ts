import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content.stack-auth.com",
      },
    ],
  },
};

export default nextConfig;
