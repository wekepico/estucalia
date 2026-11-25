// Pasa el idioma de ?lang= al layout raíz, que no recibe searchParams, para
// que el HTML del servidor salga con <html lang> y el pie en ese idioma.

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const headers = new Headers(request.headers);
  headers.set("x-lang", lang === "en" || lang === "fr" ? lang : "es");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Solo páginas: se excluyen /_next, /api y ficheros con extensión.
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
