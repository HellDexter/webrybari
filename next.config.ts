import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google.com www.gstatic.com challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com frontend-cdn.perplexity.ai",
              "img-src 'self' data: blob: *.supabase.co *.openstreetmap.org tile.openstreetmap.org *.google.com *.googleapis.com *.gstatic.com unpkg.com raw.githubusercontent.com cdnjs.cloudflare.com",
              "font-src 'self' fonts.gstatic.com frontend-cdn.perplexity.ai",
              "connect-src 'self' *.supabase.co *.google.com *.googleapis.com *.openstreetmap.org challenges.cloudflare.com",
              "frame-src 'self' www.google.com maps.google.com challenges.cloudflare.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
