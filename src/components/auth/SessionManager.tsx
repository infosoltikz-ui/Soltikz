'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

const THREE_HOURS_MS = 3 * 60 * 60 * 1000 // 3 hours in milliseconds

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export function SessionManager() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const isNewLogin = searchParams.get('login') === 'success'
    const cookieSessionStart = getCookie('session_start')
    const sessionActive = typeof window !== 'undefined' ? sessionStorage.getItem('soltkiz_session_active') : null

    const triggerLogout = async (reason: 'expired' | 'session_ended') => {
      try {
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch (err) {
        console.error('Error signing out:', err)
      }
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('soltkiz_session_active')
        sessionStorage.removeItem('soltkiz_session_start')
        document.cookie = 'session_start=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
      }
      router.replace(`/login?reason=${reason}`)
    }

    // 1. Fresh login detected (redirect from actions or OAuth callback with ?login=success)
    if (isNewLogin) {
      const now = Date.now().toString()
      sessionStorage.setItem('soltkiz_session_active', 'true')
      sessionStorage.setItem('soltkiz_session_start', cookieSessionStart || now)
      document.cookie = `session_start=${cookieSessionStart || now}; path=/; SameSite=Lax`

      // Remove query param from browser address bar smoothly
      const url = new URL(window.location.href)
      url.searchParams.delete('login')
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''))
      return
    }

    // 2. Check if user left the website / closed tab (sessionStorage was cleared)
    // If cookie was set in the last 15 seconds, treat it as a fresh login handshake
    const recentAuth = cookieSessionStart && (Date.now() - parseInt(cookieSessionStart, 10) < 15000)

    if (!sessionActive && !recentAuth) {
      // User closed tab/browser and reopened directly to dashboard -> require re-login
      triggerLogout('session_ended')
      return
    }

    if (!sessionActive && recentAuth) {
      sessionStorage.setItem('soltkiz_session_active', 'true')
      sessionStorage.setItem('soltkiz_session_start', cookieSessionStart!)
    }

    // 3. Check 3-hour expiry on mount
    const startTime = parseInt(
      sessionStorage.getItem('soltkiz_session_start') || cookieSessionStart || '0',
      10
    )

    if (startTime && Date.now() - startTime >= THREE_HOURS_MS) {
      triggerLogout('expired')
      return
    }

    // 4. Interval checking every 30 seconds for 3-hour limit
    const interval = setInterval(() => {
      const currentStart = parseInt(
        sessionStorage.getItem('soltkiz_session_start') || getCookie('session_start') || '0',
        10
      )
      if (currentStart && Date.now() - currentStart >= THREE_HOURS_MS) {
        clearInterval(interval)
        triggerLogout('expired')
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [router, searchParams])

  return null
}
