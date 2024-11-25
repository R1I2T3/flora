import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./lib/env";
export function middleware(request: NextRequest) {
  if (request.url.endsWith("/")) {
    return NextResponse.redirect(new URL("/site", request.url));
  }
  const url = request.nextUrl;
  const searchParms = url.searchParams.toString();
  const pathWithSearchParams = `${url.pathname}${
    searchParms ? `?${searchParms}` : ""
  }`;
  const hostname = request.headers;
  const customSubDomain = hostname
    .get("host")
    ?.split(env.NEXT_PUBLIC_DOMAIN)
    .filter(Boolean)[0];
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url)
    );
  }
  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`/agency/sign-in`, request.url));
  }
  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    return NextResponse.rewrite(
      new URL(`${pathWithSearchParams}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
