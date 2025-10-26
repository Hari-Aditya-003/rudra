import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Only protect admin paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],  // ✅ not /events
};