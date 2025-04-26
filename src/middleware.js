import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

/*export async function middleware(request) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;

    // Protected admin routes
    const isAdminRoute = pathname.startsWith('/dashboard');

    if (isAdminRoute) {
        if (!token) {
            // User not logged in at all
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }

        if (token.role !== 'admin') {
            // User logged in but NOT admin
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }

    return NextResponse.next();
}

// Only run on /dashboard/** paths
export const config = {
    matcher: ['/dashboard/:path*']
}
    */



export async function middleware(request) {
    const token = await getToken({ req: request });

    const isTokenOK = Boolean(token);
    const isAdminUser = token?.role === 'admin';
    const isAdminSpecificRoute = request.nextUrl.pathname.startsWith('/dashboard');

    if (isAdminSpecificRoute && !isAdminUser) {
        const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, request.url));
    }

    return NextResponse.next();
}

