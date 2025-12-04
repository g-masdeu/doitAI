import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  // CORRECCIÓN:
  // 1. Verificamos si existe 'locale'.
  // 2. Convertimos 'routing.locales' a 'readonly string[]' para que el método .includes()
  //    acepte comparar con un string genérico sin quejarse.
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    // Aquí TypeScript ya sabe que locale es seguro
    messages: (await import(`../messages/${locale}.json`)).default
  };
});