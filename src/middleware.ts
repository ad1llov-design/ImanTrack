import { type NextRequest, NextResponse } from "next/server";

/**
 * Middleware — passthrough for MVP.
 * No auth checks, no redirects, no Supabase.
 * All routes are public.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons|patterns|api).*)",
  ],
};
