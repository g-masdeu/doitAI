import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider"; 
import "./globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // params ahora es una Promesa en Next 15, ojo
}) {
  // En Next 15 params es async, necesitamos un await si da error.
  // Si usas Next 14: const { locale } = params;
  const { locale } = await params;

  // Validar idioma
  if (!["es", "en", "fr", "de", "it", "ca", "eu"].includes(locale)) {
    notFound();
  }

  // Cargar mensajes
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
