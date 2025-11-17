import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Cho Supabase Storage
      },
    ],
  },
  // Bật Turbopack cho dev (tùy chọn, đã default)
  // experimental: {
  //   turbo: {},
  // },
}

export default nextConfig
