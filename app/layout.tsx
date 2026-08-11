import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BioSense — Understand your biology. Live your best.',
  description:
    'Personalised health intelligence. Sleep better, recover faster, perform stronger.',
  appleWebApp: {
    capable: true,
    title: 'BioSense',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
}

/** Safe-area aware viewport for the Capacitor / iOS shell. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F7F5F0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable}`}
    >
      <body className="bg-sand text-ink antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#FFFFFF',
                border: '1px solid rgba(26,28,26,0.07)',
                color: '#1A1C1A',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
