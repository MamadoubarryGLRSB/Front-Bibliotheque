import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "images.amazon.com",
        pathname: "/**", // Permet de charger toutes les images depuis ce domaine
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
