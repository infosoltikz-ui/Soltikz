import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const ADMIN_EMAILS = [
  'info.soltikz@gmail.com',
  'balajiprojects049@gmail.com'
]

export async function middleware(request: NextRequest) {
  // Update the Supabase session
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isAdminAuthRoute = pathname === '/admin/login'
  
  const isUserDashboard = pathname.startsWith('/dashboard')
  const isAdminDashboard = pathname.startsWith('/admin') && pathname !== '/admin/login'

  const userEmail = user?.email || ''
  const isAdmin = ADMIN_EMAILS.includes(userEmail)

  // 1. If user is logged in and visits an auth route or the home page
  if (user) {
    if (isAuthRoute || pathname === '/') {
      // Normal auth route or home page -> dashboard
      const url = request.nextUrl.clone()
      url.pathname = isAdmin ? '/admin' : '/dashboard'
      return Response.redirect(url)
    }
    if (isAdminAuthRoute && isAdmin) {
      // If they are an admin visiting admin login, take them to admin dashboard
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return Response.redirect(url)
    }
    // If they are NOT an admin, we actually DO want to let them see /admin/login
    // so they have a chance to log in with their admin credentials.
  }

  // 2. Protect User Dashboard
  if (!user && isUserDashboard) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  // 3. Protect Admin Dashboard
  if (isAdminDashboard) {
    if (!user || !isAdmin) {
      // If not logged in, or logged in as a NORMAL user -> redirect to admin login
      // This forces them to log in with an admin account if they want access.
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return Response.redirect(url)
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
