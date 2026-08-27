import { NextResponse } from "next/server";

//setting up a middleware for protecting routes
//1. get the token
//2. get pathname
//3. check if private route
//4. check if public route
//5. check if trying to access private route when not logged in
//6. check if trying to access public route when logged in
//7. check if logged in and accessing homepage
//8. redirect
//9. bypass api and internal files

export function proxy(request) {
  //get the cookie token
  const token = request.cookies
    .getAll()
    .find((c) => c.name.includes("authjs.session-token"))?.value;

  //get the url
  const { pathname } = request.nextUrl;

  //private route
  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/tasks");

  //public route
  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  //home route
  const isHomeRoute = pathname === "/";

  //check if not logged in and trying to access dashboard routes
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //check if logged in and trying to access login page
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //check if logged in and accessing homepage
  if (token && isHomeRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

//ensure API and internal files bypass middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
