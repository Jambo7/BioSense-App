import type { NextConfig } from 'next'

const LEGAL_SITE = 'https://bio-sense.ai'

const nextConfig: NextConfig = {
  // Standalone output required for Cloud Run Docker deployment
  output: 'standalone',
  async redirects() {
    const paths = [
      '/privacy',
      '/terms',
      '/terms-of-use',
      '/subscription-terms',
      '/wellness-disclaimer',
      '/ai-transparency',
      '/acceptable-use',
      '/privacy-choices',
      '/cookies',
      '/complaints',
      '/health-ai',
    ]
    return paths.map((source) => ({
      source,
      destination: `${LEGAL_SITE}${source}`,
      permanent: false,
    }))
  },
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
