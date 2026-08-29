import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Standalone output required for Cloud Run Docker deployment
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'bio-sense-app-navy.vercel.app',
        'capacitor://localhost',
        'ai.biosense.app',
      ],
    },
  },
  transpilePackages: [
    '@capacitor/core',
    '@capacitor/app',
    '@capacitor/local-notifications',
  ],
  // Required for pdf-parse (native binary)
  serverExternalPackages: ['pdf-parse'],
}

export default nextConfig
