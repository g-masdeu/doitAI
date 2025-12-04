'use server'

import https from 'https'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import axios from 'axios'

interface FormState {
  error?: string | null;
}

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email')
  const password = formData.get('password')

  // Validación básica en el lado del servidor de Next.js
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Por favor completa todos los campos.' }
  }

   // --- NUEVA LÓGICA DE IP ---
  const headersList = await headers()
  let ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
           headersList.get('x-real-ip') || 
           '127.0.0.1'

  if (ip === '::1') ip = '127.0.0.1'
  
    // 👇 AQUÍ ESTÁ LA MAGIA PARA VERLO EN TU CONSOLA
    console.log("╭──────────────────────────────────────────╮")
    console.log(`│ 🕵️  IP DETECTADA: ${ip.padEnd(23)} │`)
    console.log(`│ 📧  USUARIO:      ${email.padEnd(23)} │`)
    console.log("╰──────────────────────────────────────────╯")
    // --------------------------

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    
    // 1. Creamos el agente para ignorar el error de certificado auto-firmado
    const agent = new https.Agent({  
      rejectUnauthorized: false 
    });

    // 2. Llamada exacta a tu Spring Boot pasando el agente
    // Nota: El agente va en el TERCER argumento (configuración)
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email: email, 
      password: password
    }, {
      httpsAgent: agent 
    })

    // 3. Extraer el token según tu AuthResponse java: { "token": "..." }
    const token = response.data.token 

    if (!token) {
        throw new Error('No se recibió token del servidor')
    }

    // 4. Guardar en Cookie Segura
    const cookieStore = await cookies()
    
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 5, // 5 minutos
      path: '/',
    })

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        // AQUI CAPTURAMOS TUS ERRORES DE SPRING BOOT
        
        // Caso 403: Email no verificado (según tu código Java)
        if (error.response.status === 403) {
            return { error: 'Tu cuenta no está activa. Por favor revisa tu correo para verificarla.' }
        }

        // Otros errores (401 Bad Credentials, etc)
        const backendMessage = error.response.data 
        
        if (typeof backendMessage === 'string') {
             return { error: backendMessage }
        }
        
        return { error: 'Credenciales incorrectas o usuario no encontrado.' }
    }
    // Devolvemos el error en texto para depurar mejor
    return { error: `${error}` }
  }

  // 5. Redirigir si todo sale bien
  redirect('/dashboard')
}