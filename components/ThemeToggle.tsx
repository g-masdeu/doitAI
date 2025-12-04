"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 opacity-0" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      // 1. Animación de Entrada (Cascada)
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      // CONFIGURACIÓN CLAVE:
      // Separamos las transiciones para que el 'hover out' no tenga retraso
      transition={{
        opacity: { delay: 0.95 }, // La entrada tarda en empezar
        x: { delay: 0.95 }, // La entrada tarda en empezar
        scale: { duration: 0.2 }, // La escala (volver del hover) es suave e inmediata
      }}
      // 2. Interacción SUAVE (Como el LanguageSwitcher)
      // Al quitar 'duration: 0', vuelve a usar el efecto muelle por defecto
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // 3. CSS: Volvemos a poner 'transition-colors' para el fondo suave
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl backdrop-blur-sm transition-colors border
      bg-black/3 border-black/10 hover:bg-black/10 dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/20"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        ☀️
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        🌙
      </motion.div>
    </motion.button>
  );
}
