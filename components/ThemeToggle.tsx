"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  // 1. CORRECCIÓN: Quitamos 'theme' de aquí porque no lo estabas usando.
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 2. CORRECCIÓN: Este patrón es necesario para next-themes.
  // Añadimos la línea de abajo para que el linter sepa que esto es intencional.
  useEffect(() => {
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" /> 
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-sm transition hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/10"
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
    </button>
  )
}