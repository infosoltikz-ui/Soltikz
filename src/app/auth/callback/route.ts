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
      const forwardedHost = request.headers.get('x-forwarded-host')
      const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
      const isLocalEnv = process.env.NODE_ENV === 'development'

      const destination = next.startsWith('/') ? next : `/${next}`
      const targetQuery = destination.includes('?') ? '&login=success' : '?login=success'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${destination}${targetQuery}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`${forwardedProto}://${forwardedHost}${destination}${targetQuery}`)
      } else {
        return NextResponse.redirect(`${origin}${destination}${targetQuery}`)
      }
    } else {
      console.error('OAuth Exchange Error:', error.message)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate with Google`)
}
