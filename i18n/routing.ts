import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation'; // 👈 CAMBIO AQUÍ

export const routing = defineRouting({
  // Una lista de todos los idiomas soportados
  locales: ['es', 'en', 'fr', 'de', 'it', 'ca', 'eu'],
 
  // Usado si no coincide ningún idioma
  defaultLocale: 'es'
});
 
// Wrappers ligeros alrededor de las APIs de navegación de Next.js
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing); // 👈 CAMBIO AQUÍ