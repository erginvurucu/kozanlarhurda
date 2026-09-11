import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Ana dizinde alakasiz bir package-lock.json bulundugu icin Next.js
  // calisma alani kokunu yanlis tahmin ediyordu; acikca belirtiyoruz.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
