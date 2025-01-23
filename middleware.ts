import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const locales = ["en", "fa","ar"]; // Supported locales

// Get the preferred locale based on the Accept-Language header
function getLocale(request: NextRequest): string {
  const defaultLocale = process.env.DEFAULT_LANG;
  if (defaultLocale && locales.includes(defaultLocale)) {
    return defaultLocale;
  }
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim());

    for (const preferredLocale of preferredLocales) {
      if (locales.includes(preferredLocale)) {
        return preferredLocale;
      }
    }
  }
  return "en";
}
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle the /languages route
  if (pathname === "/languages") {
    const selectedLanguage = searchParams.get("lang");

    if (selectedLanguage && locales.includes(selectedLanguage)) {
      const redirectUrl = new URL(`/${selectedLanguage}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }
  if (!process.env.IS_NOT_MULTILANG) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
      return NextResponse.next();
    }
    const staticPaths = [
      "/_next", // Next.js internal paths
      "/favicon", // Example static folder for images
      "/fonts", // Example static folder for fonts
      "/assets", // Any other static folder you have
    ];
    if (staticPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    const locale = getLocale(request);
    const redirectUrl = new URL(`/${locale}${pathname}`, request.nextUrl);
    return NextResponse.redirect(redirectUrl);
  } else {
    const locale = getLocale(request);

    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
      const redirectUrl = new URL(`/${locale}${pathname}`, request.nextUrl);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    // Match all paths except internal ones like _next, assets, etc.
    "/((?!_next|api|favicon|fonts|assets).*)", // exclude assets from middleware
  ],
};
