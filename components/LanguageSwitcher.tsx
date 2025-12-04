'use client'

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';

// Mapeo entre tus idiomas y las clases de las banderas (ISO 3166)
const FLAG_CODES: Record<string, string> = {
  es: 'fi-es',       // España
  en: 'fi-gb',       // Reino Unido (para inglés)
  fr: 'fi-fr',       // Francia
  de: 'fi-de',       // Alemania
  it: 'fi-it',       // Italia
  ca: 'fi-es-ct',    // Cataluña (Oficial en la librería)
  eu: 'fi-es-pv',    // País Vasco (Oficial en la librería)
};

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown si haces clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const changeLanguage = (nextLocale: string) => {
    setIsOpen(false); // Cerramos el menú
    if (nextLocale === currentLocale) return;

    startTransition(() => {
      // Reemplazar el idioma en la URL
      let pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
      if (pathWithoutLocale.length === 0) pathWithoutLocale = '/';
      
      router.replace(`/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
    });
  };

  return (
    <div className="relative z-100" ref={dropdownRef}>
      {/* Botón Principal (Muestra bandera actual) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center justify-center rounded-full bg-white/10 p-2 text-2xl transition hover:bg-white/20 hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/10"
        title="Cambiar idioma"
      >
        {/* Clase 'fi' es obligatoria, 'fis' es para que sea cuadrada/redonda según el tema */}
        <span className={`fi ${FLAG_CODES[currentLocale]} fis rounded-full`} />
      </button>

      {/* Lista Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-16 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-1">
            {Object.entries(FLAG_CODES).map(([code, flagClass]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex items-center justify-center rounded-lg p-2 transition hover:bg-gray-100 ${
                  currentLocale === code ? 'bg-green-50 ring-1 ring-green-200' : ''
                }`}
                title={code.toUpperCase()}
              >
                <span className={`fi ${flagClass} fis rounded-full text-xl`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}