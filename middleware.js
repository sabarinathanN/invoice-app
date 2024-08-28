// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const authCookie = req.cookies.get('auth');
  const isAuthenticated = authCookie && authCookie.value === 'true';

  console.log('Auth cookie:', authCookie); // Debugging log

  const protectedRoutes = [
    '/clientlist', '/company', '/createclient', '/createinvoice',
    '/editClient', '/editCompany', '/editinvoice', '/invoice', '/preview'
  ];

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log('Not authenticated, redirecting to login'); // Debugging log
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/clientlist*', '/company*', '/createclient*', '/createinvoice*',
    '/editClient*', '/editCompany*', '/editinvoice*', '/invoice*', '/preview*'
  ],
};
