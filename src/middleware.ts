import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware runs only on matched paths (defined below)
export function middleware(req: NextRequest) {
  // Add auth/session checks here if needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"], // Protect only admin-related routes
};
