'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  // Use a fallback or throw if missing in a real production app
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </GoogleOAuthProvider>
  )
}
