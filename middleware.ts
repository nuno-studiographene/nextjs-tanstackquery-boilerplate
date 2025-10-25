import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/blogs', '/users', '/login']
  
  // Check if the current route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for authentication token in cookies
  const authToken = request.cookies.get('auth-token')?.value
  
  // If no token and trying to access protected route, redirect to login
  if (!authToken && pathname.startsWith('/protected-route')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
