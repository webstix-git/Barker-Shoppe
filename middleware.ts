import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sitemapEntries } from "@/lib/seo";

/** Public marketing routes that should render (not redirect home). */
const knownPaths = new Set<string>([
  ...sitemapEntries.map((entry) => entry.path),
  "/thank-you",
]);

function isAssetOrInternal(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/images")) return true;
  // Static/metadata files: favicon.ico, robots.txt, sitemap.xml, icons, og images
  if (pathname.includes(".")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isAssetOrInternal(pathname)) return NextResponse.next();

  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (knownPaths.has(normalized)) return NextResponse.next();

  // Unknown / legacy path with no matching page → home (no 404)
  const home = request.nextUrl.clone();
  home.pathname = "/";
  home.search = "";
  return NextResponse.redirect(home, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
