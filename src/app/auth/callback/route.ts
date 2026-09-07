import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const errorDescription = searchParams.get('error_description')

  if (errorDescription) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Create a clean redirect URL using the original request URL as the base.
      // This works reliably in Vercel and local environments.
      const destination = next.startsWith('/') ? next : `/${next}`
      const targetUrl = new URL(destination, request.url)
      targetUrl.searchParams.set('login', 'success')

      return NextResponse.redirect(targetUrl)
    } else {
      console.error('OAuth Exchange Error:', error.message)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate with Google`)
}
