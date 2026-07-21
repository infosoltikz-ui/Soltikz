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

  // 1. If user is logged in and visits an auth route
  if (user) {
    if (isAuthRoute) {
      // Normal auth route -> dashboard
      const url = request.nextUrl.clone()
      url.pathname = isAdmin ? '/admin' : '/dashboard'
      return Response.redirect(url)
    }
    if (isAdminAuthRoute) {
      // Admin auth route -> admin dashboard
      const url = request.nextUrl.clone()
      url.pathname = isAdmin ? '/admin' : '/dashboard'
      return Response.redirect(url)
    }
  }

  // 2. Protect User Dashboard
  if (!user && isUserDashboard) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  // 3. Protect Admin Dashboard
  if (isAdminDashboard) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return Response.redirect(url)
    }
    if (!isAdmin) {
      // Logged in but not an admin -> redirect to normal dashboard
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
