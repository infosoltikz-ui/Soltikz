import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { ADMIN_EMAILS } from '@/utils/adminAuth'

export async function proxy(request: NextRequest) {
  // Update the Supabase session
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isAdminAuthRoute = pathname === '/admin/login'
  
  const isUserDashboard = pathname.startsWith('/dashboard')
  const isAdminDashboard = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApiRoute = pathname.startsWith('/api/admin')

  const userEmail = user?.email || ''
  const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase().trim())

  const THREE_HOURS_MS = 3 * 60 * 60 * 1000 // 3 hours

  // Session expiry check (3 hours)
  const sessionStartVal = request.cookies.get('session_start')?.value
  const sessionStartTime = sessionStartVal ? parseInt(sessionStartVal, 10) : null
  const isSessionExpired = sessionStartTime ? (Date.now() - sessionStartTime > THREE_HOURS_MS) : false

  // Protect Admin API Routes immediately
  if (isAdminApiRoute) {
    if (!user || !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin privileges required' },
        { status: 401 }
      )
    }
  }

  // 1. Protect User Dashboard (Require user, valid session, and not expired)
  if (isUserDashboard) {
    if (!user || !sessionStartTime || isSessionExpired) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      if (isSessionExpired) {
        url.searchParams.set('reason', 'expired')
      }
      const response = NextResponse.redirect(url)
      response.cookies.delete('session_start')
      return response
    }
  }

  // 2. If user is logged in with active session and visits auth routes (/login, /register)
  // (NOTE: Home page '/' is NOT redirected, so users can view the home page at any time)
  if (user && !isSessionExpired && sessionStartTime) {
    if (isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = isAdmin ? '/admin' : '/dashboard'
      return NextResponse.redirect(url)
    }
    if (isAdminAuthRoute && isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  // 3. Protect Admin Dashboard
  if (isAdminDashboard) {
    if (!user || !isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|xml|txt|json)$).*)',
  ],
}
