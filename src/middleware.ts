 import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("foodexplorer.token")?.value;

  const signURL = new URL("/", request.url);
  const homeURL = new URL("/Home", request.url);

  if(!token) {
    if(request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(signURL);
  }


}

export const config = {
  matcher: [
    "/",
    "/Home/:path*",
    "/CreateFood/:path*",
    "/EditFood/:path*",
    "/Details/:path*",
    "/Profile/:path*"
  ]
}
