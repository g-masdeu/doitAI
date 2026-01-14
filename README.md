# doitAI

Frontal para una idea de **landing page** desarrollado en **Next.js** y pensado para **UX/UI**.

## ✨ Qué hay aquí

- Landing page / frontend en Next.js (App Router).
- Componentes reutilizables en `components/`. :contentReference[oaicite:2]{index=2}
- Estructura preparada para **i18n** (carpetas `i18n/` y `messages/`) y routing vía `middleware.ts`.
- Estilado con **Tailwind CSS** (`tailwind.config.ts`, `postcss.config.mjs`). 

> Nota: Este repositorio está enfocado al **frontend** y a iterar rápido diseño/estructura.

---
<img width="600" height="auto" alt="image" src="https://github.com/user-attachments/assets/582465c9-4651-4f6f-a87a-990256cab901" />
<img width="600" height="auto" alt="image" src="https://github.com/user-attachments/assets/db7de550-8f63-43c7-8e9c-c8a966f0e0ac" />

## 🧰 Stack

- **Next.js** + **TypeScript** 
- **Tailwind CSS** 
- ESLint (config incluida)

---

## 🚀 Cómo ejecutar en local

### Requisitos
- Node.js (recomendado LTS)
- npm (o pnpm / yarn / bun)

### Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Abre http://localhost:3000.

## Build (producción)
```bash
npm run build
npm run start
```
## 🗂️ Estructura del proyecto
Resumen de carpetas principales: 
GitHub

app/ → rutas, páginas y layout (App Router)

components/ → componentes UI reutilizables

i18n/ → configuración/ayudantes de internacionalización

messages/ → archivos de traducciones

public/ → estáticos (imágenes, iconos, etc.)

middleware.ts → lógica de middleware (p. ej. routing/locale)

tailwind.config.ts / postcss.config.mjs → estilos

---

## 🌍 Internacionalización (i18n)
La base para multi-idioma está separada en:

messages/ para textos/traducciones

i18n/ para configuración

middleware.ts para ayudar al enrutado por idioma 
GitHub

Cómo añadir un idioma (guía práctica):

Crea un nuevo archivo/carpeta de traducciones en messages/.

Añade/actualiza la configuración correspondiente en i18n/.

Revisa el comportamiento de rutas/redirects en middleware.ts.

---

## 👥 Autores
Guillem Masdeu (g-masdeu) 
