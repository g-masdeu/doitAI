import { cookies } from 'next/headers'
import { logoutAction } from '@/actions/logout-action'
import SessionTimer from '@/components/SessionTimer' // 👈 Importamos el componente

// Función auxiliar para decodificar JWT sin librerías externas
function getExpFromToken(token: string): number {
  try {
    // El JWT tiene formato: Header.Payload.Signature
    const payloadBase64 = token.split('.')[1]
    
    // Decodificar Base64 en entorno Servidor (Node.js)
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString()
    const payload = JSON.parse(decodedJson)
    
    // Devolvemos el campo 'exp' (expiration time in seconds)
    return payload.exp
  } catch (e) {
    console.error("Error decodificando token", e)
    return 0
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  // Si no hay token, calculamos 0, pero el middleware ya debería haber actuado antes
  const expiresAt = token ? getExpFromToken(token) : 0

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
            <p className="text-gray-500">Bienvenido a Doit AI</p>
          </div>
          
          {/* 👇 AQUÍ AÑADIMOS EL CONTADOR */}
          <div className="ml-4">
             {token && <SessionTimer expiresAt={expiresAt} />}
          </div>
        </div>

        {/* Tarjeta con el Token */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Tu Token de Sesión</h2>
          <div className="relative rounded-md bg-slate-900 p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400">
              {token || 'Token no encontrado'}
            </pre>
          </div>
        </div>

        {/* Botón de Logout */}
        <div className="flex justify-end">
          <form action={logoutAction}>
            <button 
              type="submit"
              className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 shadow-sm"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}