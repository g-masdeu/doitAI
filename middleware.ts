import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// 1. Configuración de idiomas
const intlMiddleware = createMiddleware({
  locales: ['es', 'en', 'fr', 'de', 'it', 'ca', 'eu'],
  defaultLocale: 'es',
  localePrefix: 'always' // /es/dashboard, /en/dashboard
});

export default function middleware(request: NextRequest) {
  // 2. Ejecutar primero el middleware de idiomas para normalizar la URL
  const response = intlMiddleware(request);

  // 3. Lógica de Protección (Tu código anterior adaptado)
  const token = request.cookies.get('session_token');
  
  // Obtenemos el path actual (ej: /en/dashboard)
  const { pathname } = request.nextUrl;

  // Detectar si estamos intentando entrar a una ruta protegida
  // Buscamos si la URL contiene "/dashboard" independientemente del idioma
  // Regex: busca /es/dashboard, /en/dashboard, etc.
  const isDashboard = pathname.match(/^\/(es|en|fr|de|it|ca|eu)\/dashboard/);

  if (isDashboard) {
    if (!token) {
      // Si no hay token, redirigir al login (con el idioma actual)
      // Extraemos el locale de la URL actual para mantenerlo
      const locale = pathname.split('/')[1]; 
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  // Si estamos en la home y ya hay token, mandar al dashboard
  // Regex: busca solo la raíz con idioma (/es, /en...)
  const isHome = pathname.match(/^\/(es|en|fr|de|it|ca|eu)$/);
  
  if (isHome && token) {
     const locale = pathname.split('/')[1];
     return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return response;
}

export const config = {
  // Matcher para que next-intl funcione en todas partes excepto archivos internos
  matcher: ['/((?!api|_next|.*\\..*).*)']
};