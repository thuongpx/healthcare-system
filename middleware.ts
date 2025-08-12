import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";

// const checkRoleAndRedirect = (
//   req: NextRequest,
//   role: string | undefined,
//   allowedRoles: keyof typeof routeMatchers
// ): NextResponse | undefined => {
//   if (routeMatchers[allowedRoles](req) && role !== allowedRoles) {
//     const url = new URL("/", req.url);
//     console.log("Unauthorized access, redirecting to: ", url);
//     return NextResponse.redirect(url);
//   }
// };

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  const role =
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role
      : userId
      ? "patient"
      : "sign-in";

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  // continue if the user is authorized
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
