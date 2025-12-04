'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function SessionTimer({ expiresAt }: { expiresAt: number }) {
  const router = useRouter()

  // 1. Definimos la función de cálculo (useCallback para que sea estable)
  const calculateTimeLeft = useCallback(() => {
    const now = Math.floor(Date.now() / 1000)
    const remaining = expiresAt - now
    return remaining > 0 ? remaining : 0
  }, [expiresAt])

  // 2. SOLUCIÓN: Inicializamos el estado con el valor calculado directamente.
  // De esta forma ya tiene valor en el primer render y no necesitamos el useEffect para el set inicial.
  const [timeLeft, setTimeLeft] = useState<number>(() => calculateTimeLeft())

  useEffect(() => {
    // 3. El useEffect ahora solo se encarga del intervalo (reloj)
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)

      if (remaining <= 0) {
        clearInterval(timer)
        router.refresh() // Recarga para que el middleware actúe
      }
    }, 1000)

    // Limpieza al desmontar
    return () => clearInterval(timer)
  }, [calculateTimeLeft, router])

  // Formatear a MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Opcional: Para evitar errores de hidratación (diferencia servidor/cliente),
  // añadimos suppressHydrationWarning al span del tiempo.
  const textColor = timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-green-600'

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <span className="text-xs font-semibold uppercase text-gray-400">Sesión expira en</span>
      <span 
        className={`text-3xl font-mono font-bold ${textColor}`}
        suppressHydrationWarning
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  )
}