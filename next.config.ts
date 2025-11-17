import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, then WebP, then original format (PNG/JPEG) fallback
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long-term caching for optimized images
    minimumCacheTTL: 31536000,
    // Allow SVG images with security policy
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable gzip compression
  compress: true,
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Use SWC minifier for faster builds
  swcMinify: true,
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react'],
  },
};

export default nextConfig;
