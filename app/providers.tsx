'use client'

import { SessionProvider } from 'next-auth/react'
import { NativeBootstrap } from '@/components/native-bootstrap'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NativeBootstrap />
      {children}
    </SessionProvider>
  )
}
