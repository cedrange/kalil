import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "kalil_session";
const secret = () => new TextEncoder().encode(process.env.SESSION_SECRET);

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let authenticated = false;

  if (token) {
    try {
      await jwtVerify(token, secret());
      authenticated = true;
    } catch {
      authenticated = false;
    }
  }

  if (!authenticated) {
    const loginUrl = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
